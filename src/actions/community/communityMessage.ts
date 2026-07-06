"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Add a new message to a community board.
 *
 * @param communityId - Community ID.
 * @param formData - Form data with the "text" field.
 *
 * @returns Promise<void> - Resolves when the message is added or if the user is not authorized.
 */
const addMessage = async (communityId: number, formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return;
  }

  const membership = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: verifiedSession.session.userID,
        community: communityId
      }
    },
    select: {
      user: true
    }
  });

  if (!membership) {
    return;
  }

  const text = (formData.get("texto") as string)?.trim();

  if (!text) {
    return;
  }

  try {
    await prisma.message.create({
      data: {
        community: communityId,
        text: text
      }
    });

    revalidatePath(`/communities/${communityId}/overview`);
  } catch {}
};

/**
 * Delete a message from a community board.
 *
 * @param communityId - Community ID.
 * @param createdAt - Message creation date (part of the composite PK).
 *
 * @returns Promise<void> - Resolves when the message is deleted or if the user is not authorized.
 */
const deleteMessage = async (communityId: number, createdAt: Date): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return;
  }

  const membership = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: verifiedSession.session.userID,
        community: communityId
      }
    },
    select: {
      user: true
    }
  });

  if (!membership) {
    return;
  }

  try {
    await prisma.message.delete({
      where: {
        createdAt_community: {
          createdAt: createdAt,
          community: communityId
        }
      }
    });

    revalidatePath(`/communities/${communityId}/overview`);
  } catch {
    // Silently fail
  }
};

export { addMessage, deleteMessage };

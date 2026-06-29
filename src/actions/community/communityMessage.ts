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
 */
const addMessage = async (communityId: number, formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  // We check that the user is authenticated
  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  // Only administrators can add messages to the board
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

  // Adding empty messages is not allowed
  if (!text) {
    return;
  }

  // We try to create the message in the database
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
 * @param creadoEn - Message creation date (part of the composite PK).
 */
const deleteMessage = async (communityId: number, creadoEn: Date): Promise<void> => {
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
          createdAt: creadoEn,
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

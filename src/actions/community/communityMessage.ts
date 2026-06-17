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
  const sesionVerificada = await verifySession();

  // We check that the user is authenticated
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return;
  }

  const esAdmin =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  // Only administrators can add messages to the board
  if (!esAdmin) {
    return;
  }

  const inscripcion = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: sesionVerificada.session.userID,
        community: communityId
      }
    },
    select: {
      user: true
    }
  });

  if (!inscripcion) {
    return;
  }

  const texto = (formData.get("texto") as string)?.trim();

  // Adding empty messages is not allowed
  if (!texto) {
    return;
  }

  // We try to create the message in the database
  try {
    await prisma.message.create({
      data: {
        community: communityId,
        text: texto
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
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return;
  }

  const esAdmin =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdmin) {
    return;
  }

  const inscripcion = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: sesionVerificada.session.userID,
        community: communityId
      }
    },
    select: {
      user: true
    }
  });

  if (!inscripcion) {
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

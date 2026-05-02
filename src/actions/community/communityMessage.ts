"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Añade un nuevo mensaje al tablón de una comunidad.
 *
 * @param communityId - ID de la comunidad.
 * @param formData - Datos del formulario con el campo "texto".
 *
 */
const addMessage = async (communityId: number, formData: FormData): Promise<void> => {
  const sesionVerificada = await verifySession();

  // Comprobamos que el usuario está autenticado
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return;
  }

  const esAdmin =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  // Solo los administradores pueden añadir mensajes al tablón
  if (!esAdmin) {
    return;
  }

  const inscripcion = await prisma.inscripcion.findUnique({
    where: {
      usuario_comunidad: {
        usuario: sesionVerificada.session.userID,
        comunidad: communityId
      }
    },
    select: {
      usuario: true
    }
  });

  if (!inscripcion) {
    return;
  }

  const texto = (formData.get("texto") as string)?.trim();

  // No se permite añadir mensajes vacíos
  if (!texto) {
    return;
  }

  // Intentamos crear el mensaje en la base de datos
  try {
    await prisma.mensaje.create({
      data: {
        comunidad: communityId,
        texto
      }
    });

    revalidatePath(`/communities/${communityId}/overview`);
  } catch {}
};

/**
 * Elimina un mensaje del tablón de una comunidad.
 *
 * @param communityId - ID de la comunidad.
 * @param creadoEn - Fecha de creación del mensaje (parte del PK compuesto).
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

  const inscripcion = await prisma.inscripcion.findUnique({
    where: {
      usuario_comunidad: {
        usuario: sesionVerificada.session.userID,
        comunidad: communityId
      }
    },
    select: {
      usuario: true
    }
  });

  if (!inscripcion) {
    return;
  }

  try {
    await prisma.mensaje.delete({
      where: {
        creadoEn_comunidad: {
          creadoEn,
          comunidad: communityId
        }
      }
    });

    revalidatePath(`/communities/${communityId}/overview`);
  } catch {
    // Silently fail
  }
};

export { addMessage, deleteMessage };

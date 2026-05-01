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
 */
const addMensaje = async (communityId: number, formData: FormData): Promise<void> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return;
  }

  const esAdmin =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdmin) {
    return;
  }

  const texto = (formData.get("texto") as string)?.trim();

  if (!texto) {
    return;
  }

  try {
    await prisma.mensaje.create({
      data: {
        comunidad: communityId,
        texto
      }
    });

    revalidatePath(`/communities/${communityId}/overview`);
  } catch {
    // Silently fail — no UI feedback needed for server-side errors here
  }
};

/**
 * Elimina un mensaje del tablón de una comunidad.
 *
 * @param communityId - ID de la comunidad.
 * @param creadoEn - Fecha de creación del mensaje (parte del PK compuesto).
 */
const deleteMensaje = async (communityId: number, creadoEn: Date): Promise<void> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return;
  }

  const esAdmin =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdmin) {
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

export { addMensaje, deleteMensaje };

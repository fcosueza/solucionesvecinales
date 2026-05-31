"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import communitySchema from "@/schemas/common/community.schema";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposFormularioComunidad = z.infer<typeof communitySchema>;

/**
 * Update data for an existing community. Only the community administrator can do this.
 *
 * @param _prevState Previous state of the form action.
 * @param formData Data sent from the community setup form.
 *
 * @returns El new state of the form with the result of the update.
 */
export const updateCommunity = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para actualizar la comunidad",
      payload: formData
    };
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdministrador) {
    return {
      state: "error",
      message: "No tienes permisos para actualizar esta comunidad",
      payload: formData
    };
  }

  const communityID = Number(formData.get("communityID"));

  if (isNaN(communityID) || communityID <= 0) {
    return {
      state: "error",
      message: "ID de comunidad no válido",
      payload: formData
    };
  }

  const comunidad = await prisma.comunidad.findUnique({
    where: { id: communityID },
    select: { adminID: true }
  });

  if (!comunidad || comunidad.adminID !== sesionVerificada.session.userID) {
    return {
      state: "error",
      message: "No tienes permisos para actualizar esta comunidad",
      payload: formData
    };
  }

  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormularioComunidad> = communitySchema.safeParse(datos);

  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  try {
    await prisma.comunidad.update({
      where: { id: communityID },
      data: {
        nombre: datosValidados.data.name,
        calle: datosValidados.data.street,
        numero: datosValidados.data.number,
        ciudad: datosValidados.data.city,
        provincia: datosValidados.data.province,
        pais: datosValidados.data.country
      }
    });
  } catch {
    return {
      state: "error",
      message: "No se pudo actualizar la comunidad. Inténtalo de nuevo.",
      payload: formData
    };
  }

  return {
    state: "success",
    message: "Comunidad actualizada correctamente"
  };
};

/**
 * Permanently delete a community and all its related data.
 * Only the community administrator can do this.
 *
 * @param _prevState Previous state of the form action.
 * @param formData Form data with the ID of the community to delete.
 *
 * @returns Error state if it could not be deleted. On success, it redirects to /communities.
 */
export const deleteCommunity = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para eliminar la comunidad"
    };
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdministrador) {
    return {
      state: "error",
      message: "No tienes permisos para eliminar esta comunidad"
    };
  }

  const communityID = Number(formData.get("communityID"));

  if (isNaN(communityID) || communityID <= 0) {
    return {
      state: "error",
      message: "ID de comunidad no válido"
    };
  }

  const comunidad = await prisma.comunidad.findUnique({
    where: { id: communityID },
    select: { adminID: true }
  });

  if (!comunidad || comunidad.adminID !== sesionVerificada.session.userID) {
    return {
      state: "error",
      message: "No tienes permisos para eliminar esta comunidad"
    };
  }

  try {
    await prisma.comunidad.delete({
      where: { id: communityID }
    });
  } catch {
    return {
      state: "error",
      message: "No se pudo eliminar la comunidad. Inténtalo de nuevo."
    };
  }

  redirect("/communities");
};

/**
 * Server action that deletes a community from the backoffice.
 * Solo puede ser ejecutada por webAdmin.
 * Revalidate backoffice routes after deleting.
 *
 * @param formData FormData that must contain the "id" field of the community to be deleted
 */
export const deleteCommunityAdmin = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.comunidad.delete({ where: { id } });
    revalidatePath("/backoffice/comunidades");
    revalidatePath("/backoffice/overview");
  } catch {}
};

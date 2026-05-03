"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import communitySchema from "@/schemas/common/community.schema";
import { FormActionState, UserRole } from "@/types";
import { redirect } from "next/navigation";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposFormularioComunidad = z.infer<typeof communitySchema>;

/**
 * Actualiza los datos de una comunidad existente. Solo el administrador de la comunidad puede realizarlo.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de configuración de la comunidad.
 *
 * @returns El nuevo estado del formulario con el resultado de la actualización.
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
 * Elimina de forma permanente una comunidad y todos sus datos relacionados.
 * Solo el administrador de la comunidad puede realizarlo.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos del formulario con el ID de la comunidad a eliminar.
 *
 * @returns Estado de error si no se pudo eliminar. En éxito redirige a /communities.
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

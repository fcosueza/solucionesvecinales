"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import communitySchema from "@/schemas/common/community.schema";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SafeParseReturnType } from "zod";
import z from "zod";

type communityFormFields = z.infer<typeof communitySchema>;

/**
 * Updates community settings for a community managed by the authenticated admin user.
 *
 * @param _prevState Previous form action state
 * @param formData Form data containing community data and communityID
 * @returns Form action state indicating success or failure
 */
const updateCommunity = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para actualizar la comunidad",
      payload: formData
    };
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
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

  const community = await prisma.community.findUnique({
    where: { id: communityID },
    select: { adminId: true }
  });

  if (!community || community.adminId !== verifiedSession.session.userID) {
    return {
      state: "error",
      message: "No tienes permisos para actualizar esta comunidad",
      payload: formData
    };
  }

  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, communityFormFields> = communitySchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  try {
    await prisma.community.update({
      where: { id: communityID },
      data: {
        name: validatedData.data.name,
        street: validatedData.data.street,
        number: validatedData.data.number,
        city: validatedData.data.city,
        province: validatedData.data.province,
        country: validatedData.data.country
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
 * Deletes a community when requested by its authorized administrator.
 *
 * @param _prevState Previous form action state
 * @param formData Form data containing communityID
 * @returns Form action state on validation failures; otherwise redirects
 */
const deleteCommunity = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para eliminar la comunidad"
    };
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
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

  const community = await prisma.community.findUnique({
    where: { id: communityID },
    select: { adminId: true }
  });

  if (!community || community.adminId !== verifiedSession.session.userID) {
    return {
      state: "error",
      message: "No tienes permisos para eliminar esta comunidad"
    };
  }

  try {
    await prisma.community.delete({
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
 * Deletes a community from backoffice when executed by a web administrator.
 *
 * @param formData Form data containing the community id
 */
const deleteCommunityAdmin = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.community.delete({ where: { id } });
    revalidatePath("/backoffice/comunidades");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { deleteCommunity, deleteCommunityAdmin, updateCommunity };

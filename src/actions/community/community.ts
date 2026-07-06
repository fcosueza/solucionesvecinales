"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import communitySchema from "@/schemas/common/community.schema";
import { FormActionState, UserRole } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposFormularioComunidad = z.infer<typeof communitySchema>;

/**
 * Creates a new community, entered by an administrator user, and stores it in the database.
 *
 * @param _prevState Previous state of the form action.
 * @param formData Data sent from the community registration form.
 *
 * @returns The new state of the form with the result of the creation.
 */
const addCommunity = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para crear una comunidad",
      payload: formData
    };
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return {
      state: "error",
      message: "No tienes permisos para crear comunidades",
      payload: formData
    };
  }

  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, CamposFormularioComunidad> = communitySchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  try {
    await prisma.community.create({
      data: {
        name: validatedData.data.name,
        street: validatedData.data.street,
        number: validatedData.data.number,
        city: validatedData.data.city,
        province: validatedData.data.province,
        country: validatedData.data.country,
        adminId: verifiedSession.session.userID,
        memberships: {
          create: [
            {
              user: verifiedSession.session.userID
            }
          ]
        }
      }
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return {
        state: "error",
        message: "Ya existe una comunidad con esos datos",
        payload: formData
      };
    }

    return {
      state: "error",
      message: "No se pudo crear la comunidad",
      errors: {
        prisma: "Error interno"
      },
      payload: formData
    };
  }

  return {
    state: "success",
    message: "Comunidad creada exitosamente",
    payload: formData
  };
};

export default addCommunity;

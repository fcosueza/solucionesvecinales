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
 * @returns El new state of the form with the result of the creation.
 */
const addCommunity = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  // If the user is not authenticated, an error is returned
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para crear una comunidad",
      payload: formData
    };
  }

  // You must verify that the user is an administrator
  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  // If the user is not an administrator, they cannot create the community
  if (!esAdministrador) {
    return {
      state: "error",
      message: "No tienes permisos para crear comunidades",
      payload: formData
    };
  }

  // We validate the form data using the schema defined with Zod
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormularioComunidad> = communitySchema.safeParse(datos);

  // If the data is invalid, an error status is returned with validation messages
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // We try to create the community in the database
  try {
    await prisma.community.create({
      data: {
        name: datosValidados.data.name,
        street: datosValidados.data.street,
        number: datosValidados.data.number,
        city: datosValidados.data.city,
        province: datosValidados.data.province,
        country: datosValidados.data.country,
        adminId: sesionVerificada.session.userID,
        memberships: {
          create: [
            {
              user: sesionVerificada.session.userID
            }
          ]
        }
      }
    });
  } catch (error: unknown) {
    // If the error is a unique key conflict, we return a duplicate error
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

    // For any other errors, we return a generic message
    return {
      state: "error",
      message: "No se pudo crear la comunidad",
      errors: {
        prisma: "Error interno"
      },
      payload: formData
    };
  }

  // If everything goes well, return the status as success
  return {
    state: "success",
    message: "Comunidad creada exitosamente",
    payload: formData
  };
};

export default addCommunity;

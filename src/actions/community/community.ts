"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import communitySchema from "@/schemas/common/community.schema";
import { FormActionState, UserRole } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposFormularioComunidad = z.infer<typeof communitySchema>;

/**
 * Crea una nueva comunidad, introducida por un usuario administrador, y la almacena en la base de datos.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de alta de comunidad.
 *
 * @returns El nuevo estado del formulario con el resultado de la creación.
 */
const addCommunity = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  // Si el usuario no está autenticado, se devuelve un error
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para crear una comunidad",
      payload: formData
    };
  }

  // Hay que verificar que el usuario es administrador
  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  // Si el usuario no es administrador, no puede crear la comunidad
  if (!esAdministrador) {
    return {
      state: "error",
      message: "No tienes permisos para crear comunidades",
      payload: formData
    };
  }

  // Validamos los datos del formulario utilizando el esquema definido con Zod
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormularioComunidad> = communitySchema.safeParse(datos);

  // Si los datos no son válidos, se devuelve un estado de error con los mensajes de validación
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Intentamos crear la comunidad en la base de datos
  try {
    await prisma.comunidad.create({
      data: {
        nombre: datosValidados.data.name,
        calle: datosValidados.data.street,
        numero: datosValidados.data.number,
        ciudad: datosValidados.data.city,
        provincia: datosValidados.data.province,
        pais: datosValidados.data.country,
        adminID: sesionVerificada.session.userID,
        inscripciones: {
          create: [
            {
              usuario: sesionVerificada.session.userID
            }
          ]
        }
      }
    });
  } catch (error: unknown) {
    // Si el error es un conflicto de clave única, devolvemos un error de duplicado
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

    // Para cualquier otro error, devolvemos un mensaje genérico
    return {
      state: "error",
      message: "No se pudo crear la comunidad",
      errors: {
        prisma: "Error interno"
      },
      payload: formData
    };
  }

  // Si todo va bien, devolvemos el estado como success
  return {
    state: "success",
    message: "Comunidad creada exitosamente",
    payload: formData
  };
};

export default addCommunity;

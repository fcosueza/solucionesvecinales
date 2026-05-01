"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import profileSchema from "@/schemas/common/profile.schema";
import bcrypt from "bcrypt";
import { FormActionState } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposFormularioPerfil = z.infer<typeof profileSchema>;

/**
 * Actualiza los datos de perfil del usuario autenticado.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de perfil.
 *
 * @returns El nuevo estado del formulario con el resultado de la actualización.
 */
const updateProfile = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para actualizar tu perfil",
      payload: formData
    };
  }

  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormularioPerfil> = profileSchema.safeParse(datos);

  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  try {
    const nuevaContrasena: string = datosValidados.data.password ?? "";

    let hashedPassword: string | null = null;

    if (nuevaContrasena) {
      const salCifrado: number = 10;
      hashedPassword = await bcrypt.hash(nuevaContrasena, salCifrado);
    }

    await prisma.usuario.update({
      where: { id: sesionVerificada.session.userID },
      data: {
        nombre: datosValidados.data.name,
        apellido: datosValidados.data.surname,
        email: datosValidados.data.email,
        ...(hashedPassword
          ? {
              credenciales: {
                upsert: {
                  create: { password: hashedPassword },
                  update: { password: hashedPassword }
                }
              }
            }
          : {})
      }
    });

    return {
      state: "success",
      message: "Perfil actualizado correctamente"
    };
  } catch {
    return {
      state: "error",
      message: "Error al actualizar el perfil. Inténtalo de nuevo.",
      payload: formData
    };
  }
};

export default updateProfile;

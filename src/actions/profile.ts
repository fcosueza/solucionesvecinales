"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { eliminarSesion } from "@/lib/session";
import profileSchema from "@/schemas/common/profile.schema";
import { FormActionState } from "@/types";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { saveProfileImageFile } from "./uploadProfileImage";
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
export const updateProfile = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
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
    const nuevaContrasena: string = datosValidados.data.password;
    const imageFile = formData.get("imagen");

    let hashedPassword: string | null = null;
    let imageUrl: string | null = null;

    if (nuevaContrasena) {
      const salCifrado: number = 10;
      hashedPassword = await bcrypt.hash(nuevaContrasena, salCifrado);
    }

    if (imageFile instanceof File && imageFile.size > 0) {
      const savedImage = await saveProfileImageFile(imageFile, sesionVerificada.session.userID);

      if (savedImage.error || !savedImage.imagen) {
        return {
          state: "error",
          message: savedImage.error ?? "Error al actualizar la imagen de perfil",
          payload: formData
        };
      }

      imageUrl = savedImage.imagen;
    }

    await prisma.usuario.update({
      where: { id: sesionVerificada.session.userID },
      data: {
        nombre: datosValidados.data.name,
        apellido: datosValidados.data.surname,
        email: datosValidados.data.email,
        ...(imageUrl ? { imagen: imageUrl } : {}),
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

/**
 * Elimina de forma permanente el usuario autenticado y sus datos relacionados.
 *
 * @returns Estado de error si no se pudo eliminar la cuenta. En éxito redirige a la home.
 */
export const deleteProfile = async (_prevState: FormActionState): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para eliminar tu cuenta"
    };
  }

  try {
    const userID = String(sesionVerificada.session.userID);

    await prisma.$transaction(async tx => {
      // Si el usuario administra comunidades, primero se eliminan para evitar restricciones de FK.
      await tx.comunidad.deleteMany({
        where: { adminID: userID }
      });

      await tx.usuario.delete({
        where: { id: userID }
      });
    });
  } catch {
    return {
      state: "error",
      message: "No se pudo eliminar la cuenta. Inténtalo de nuevo."
    };
  }

  await eliminarSesion();
  redirect("/");
};

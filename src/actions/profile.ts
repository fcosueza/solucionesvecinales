"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { eliminarSesion } from "@/lib/session";
import profileSchema from "@/schemas/common/profile.schema";
import { FormActionState } from "@/types";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import { extname, join } from "path";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposFormularioPerfil = z.infer<typeof profileSchema>;

/**
 * Updates the authenticated user's profile data.
 *
 * @param _prevState Previous state of the form action.
 * @param formData Data sent from the profile form.
 *
 * @returns El new state of the form with the result of the update.
 */
export const updateProfile = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  // If there is no authenticated session, an error status is returned
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para actualizar tu perfil",
      payload: formData
    };
  }

  // The form data is validated using the schema defined with Zod
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormularioPerfil> = profileSchema.safeParse(datos);

  // If validation fails, an error status is returned
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // If the validation is successful, the user's profile is updated.
  try {
    const nuevaContrasena: string = datosValidados.data.password;
    const ficheroImagen = formData.get("imagen");

    let passwordCifrado: string | null = null;
    let urlImagen: string | undefined = undefined;

    if (nuevaContrasena) {
      const salCifrado: number = 10;
      passwordCifrado = await bcrypt.hash(nuevaContrasena, salCifrado);
    }

    // If the image file exists it is saved, if it cannot be saved an error status is returned
    if (ficheroImagen instanceof File && ficheroImagen.size > 0) {
      const imagenGuardada = await saveProfileImageFile(ficheroImagen, sesionVerificada.session.userID);

      if (imagenGuardada.error) {
        return {
          state: "error",
          message: imagenGuardada.error,
          payload: formData
        };
      }

      urlImagen = imagenGuardada.imagen;
    }

    // The user's data is updated in the database, including the new image and password if provided
    await prisma.usuario.update({
      where: { id: sesionVerificada.session.userID },
      data: {
        nombre: datosValidados.data.name,
        apellido: datosValidados.data.surname,
        email: datosValidados.data.email,
        ...(urlImagen ? { imagen: urlImagen } : {}),
        ...(passwordCifrado
          ? {
              credenciales: {
                upsert: {
                  create: { password: passwordCifrado },
                  update: { password: passwordCifrado }
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
 * Permanently deletes the authenticated user and its related data.
 *
 * @returns Error state if the account could not be deleted. On success, redirects to home.
 */
export const deleteProfile = async (_prevState: FormActionState): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para eliminar tu cuenta"
    };
  }

  const userID = String(sesionVerificada.session.userID);

  try {
    await prisma.$transaction(async tx => {
      await tx.comunidad.deleteMany({ where: { adminID: userID } });
      await tx.usuario.delete({ where: { id: userID } });
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

// Allowed formats and maximum size for profile images
const TIPOS_MIME_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TAMANO_MAX_EN_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Save the profile picture file to the server.
 * Validate the file format and size before saving it.
 * The file is saved with the user ID and current date to avoid collisions.
 *
 * @param file El archivo de imagen a guardar
 * @param userID The ID of the user to whom the image belongs
 * @returns An object with the URL of the saved image, or an error message
 */
export const saveProfileImageFile = async (
  file: File,
  userID: number | string
): Promise<{ error?: string; imagen?: string }> => {
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No se ha proporcionado ningún archivo" };
  }

  if (!TIPOS_MIME_PERMITIDOS.includes(file.type)) {
    return { error: "Formato de imagen no permitido. Usa JPG, PNG, WebP o GIF." };
  }

  if (file.size > TAMANO_MAX_EN_BYTES) {
    return { error: "La imagen no puede superar los 5 MB." };
  }

  const extension = extname(file.name) || ".jpg";
  const nombreFichero = `${userID}-${Date.now()}${extension}`;
  const directorioSubida = join(process.cwd(), "public", "uploads", "profiles");
  const rutaFichero = join(directorioSubida, nombreFichero);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(rutaFichero, buffer);

  const imagenUrl = `/uploads/profiles/${nombreFichero}`;

  return { imagen: imagenUrl };
};

/**
 * Server action that uploads a profile image for the authenticated user.
 * Validates the session, processes the image file and updates the URL in the database.
 *
 * @param formData FormData that must contain the "image" field with the file to upload
 * @returns An object with the URL of the uploaded image, or an error message
 */
export const uploadProfile = async (formData: FormData): Promise<{ error?: string; imagen?: string }> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return { error: "Debes iniciar sesión para subir una imagen" };
  }

  const file = formData.get("imagen");
  const result = await saveProfileImageFile(file as File, sesionVerificada.session.userID);

  if (result.error) {
    return { error: result.error };
  }

  await prisma.usuario.update({
    where: { id: sesionVerificada.session.userID },
    data: { imagen: result.imagen }
  });

  return { imagen: result.imagen };
};

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
 * @returns The new state of the form with the result of the update.
 */
export const updateProfile = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  // If there is no authenticated session, an error status is returned
  if (!verifiedSession.isAuth || !verifiedSession.session) {
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
    const newPassword: string = datosValidados.data.password;
    const imageFile = formData.get("imagen");

    let cypherPassword: string | null = null;
    let imageURL: string | undefined = undefined;

    if (newPassword) {
      const saltCypher: number = 10;
      cypherPassword = await bcrypt.hash(newPassword, saltCypher);
    }

    // If the image file exists it is saved, if it cannot be saved an error status is returned
    if (imageFile instanceof File && imageFile.size > 0) {
      const savedImage = await saveProfileImageFile(imageFile, verifiedSession.session.userID);

      if (savedImage.error) {
        return {
          state: "error",
          message: savedImage.error,
          payload: formData
        };
      }

      imageURL = savedImage.imagen;
    }

    // The user's data is updated in the database, including the new image and password if provided
    await prisma.usuario.update({
      where: { id: verifiedSession.session.userID },
      data: {
        nombre: datosValidados.data.name,
        apellido: datosValidados.data.surname,
        email: datosValidados.data.email,
        ...(imageURL ? { imagen: imageURL } : {}),
        ...(cypherPassword
          ? {
              credenciales: {
                upsert: {
                  create: { password: cypherPassword },
                  update: { password: cypherPassword }
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
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para eliminar tu cuenta"
    };
  }

  const userID = String(verifiedSession.session.userID);

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
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Save the profile picture file to the server, validating the file format and size before saving it.
 * The file is saved with the user ID and current date to avoid collisions.
 *
 * @param file The image file to save
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

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { error: "Formato de imagen no permitido. Usa JPG, PNG, WebP o GIF." };
  }

  if (file.size > MAX_SIZE_IN_BYTES) {
    return { error: "La imagen no puede superar los 5 MB." };
  }

  const ext = extname(file.name) || ".jpg";
  const fileName = `${userID}-${Date.now()}${ext}`;
  const uploadDir = join(process.cwd(), "public", "uploads", "profiles");
  const filePath = join(uploadDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const imageURL = `/uploads/profiles/${fileName}`;

  return { imagen: imageURL };
};

/**
 * Server action that uploads a profile image for the authenticated user.
 * Validates the session, processes the image file and updates the URL in the database.
 *
 * @param formData FormData that must contain the "image" field with the file to upload
 * @returns An object with the URL of the uploaded image, or an error message
 */
export const uploadProfile = async (formData: FormData): Promise<{ error?: string; imagen?: string }> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return { error: "Debes iniciar sesión para subir una imagen" };
  }

  const file = formData.get("imagen");
  const result = await saveProfileImageFile(file as File, verifiedSession.session.userID);

  if (result.error) {
    return { error: result.error };
  }

  await prisma.usuario.update({
    where: { id: verifiedSession.session.userID },
    data: { imagen: result.imagen }
  });

  return { imagen: result.imagen };
};

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

type ProfileFormFields = z.infer<typeof profileSchema>;

/**
 * Updates the authenticated user's profile data and optional password/image.
 *
 * @param _prevState Previous form action state
 * @param formData Profile form payload
 * @returns Form action state with update result
 */
const updateProfile = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para actualizar tu perfil",
      payload: formData
    };
  }

  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, ProfileFormFields> = profileSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: "error",
      message: "Invalid form data",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  try {
    const newPassword: string = validatedData.data.password;
    const imageFile = formData.get("imagen");

    let cypherPassword: string | null = null;
    let imageURL: string | undefined = undefined;

    if (newPassword) {
      const saltCypher: number = 10;
      cypherPassword = await bcrypt.hash(newPassword, saltCypher);
    }

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

    await prisma.user.update({
      where: { id: verifiedSession.session.userID },
      data: {
        name: validatedData.data.name,
        lastName: validatedData.data.surname,
        email: validatedData.data.email,
        ...(imageURL ? { image: imageURL } : {}),
        ...(cypherPassword
          ? {
              credentials: {
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
      message: "Perfil actualizado exitosamente",
      payload: formData
    };
  } catch {
    return {
      state: "error",
      message: "No se pudo actualizar el perfil. Por favor, inténtalo de nuevo.",
      payload: formData
    };
  }
};

/**
 * Deletes the authenticated user account and its owned communities, then clears the session.
 *
 * @param _prevState Previous form action state
 * @returns Form action state when deletion fails; otherwise redirects
 */
const deleteProfile = async (_prevState: FormActionState): Promise<FormActionState> => {
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
      await tx.community.deleteMany({ where: { adminId: userID } });
      await tx.user.delete({ where: { id: userID } });
    });
  } catch {
    return {
      state: "error",
      message: "No se pudo eliminar la cuenta. Por favor, inténtalo de nuevo."
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
const saveProfileImageFile = async (
  file: File,
  userID: number | string
): Promise<{ error?: string; imagen?: string }> => {
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided" };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { error: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF." };
  }

  if (file.size > MAX_SIZE_IN_BYTES) {
    return { error: "El tamaño de la imagen no puede exceder los 5 MB." };
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
const uploadProfile = async (formData: FormData): Promise<{ error?: string; imagen?: string }> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return { error: "Debes iniciar sesión para subir una imagen" };
  }

  const file = formData.get("imagen");
  const result = await saveProfileImageFile(file as File, verifiedSession.session.userID);

  if (result.error) {
    return { error: result.error };
  }

  await prisma.user.update({
    where: { id: verifiedSession.session.userID },
    data: { image: result.imagen }
  });

  return { imagen: result.imagen };
};

export { deleteProfile, saveProfileImageFile, updateProfile, uploadProfile };

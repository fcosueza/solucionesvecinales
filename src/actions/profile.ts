"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { deleteUser } from "@/lib/user";
import { deleteSession } from "@/lib/session";
import { saveImage } from "@/lib/saveImage";
import profileSchema from "@/schemas/common/profile.schema";
import { FormActionState } from "@/types";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { SafeParseReturnType } from "zod";
import z from "zod";

type ProfileFormFields = z.infer<typeof profileSchema>;

/**
 * Updates the authenticated user's profile data and optional password/image.
 *
 * @param _prevState Previous form action state
 * @param formData Form data containing the profile fields to update
 *
 * @returns A promise that resolves to a FormActionState object indicating success or failure of the update operation.
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
      message: "Datos del formulario no válidos",
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
      const savedImage = await saveImage(imageFile, verifiedSession.session.userID, "profiles");

      if (savedImage.error) {
        return {
          state: "error",
          message: savedImage.error,
          payload: formData
        };
      }

      imageURL = savedImage.imageURL;
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
 * Deletes the authenticated user account and then clears the session.
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
  const deleteError = await deleteUser(userID);

  if (deleteError) {
    return {
      state: "error",
      message: deleteError.message
    };
  }

  await deleteSession();
  redirect("/");
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
  const result = await saveImage(file as File, verifiedSession.session.userID, "profiles");

  if (result.error || !result.imageURL) {
    return { error: result.error };
  }

  await prisma.user.update({
    where: { id: verifiedSession.session.userID },
    data: { image: result.imageURL }
  });

  return { imagen: result.imageURL };
};

export { deleteProfile, updateProfile, uploadProfile };

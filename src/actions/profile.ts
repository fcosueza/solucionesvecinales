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
 * Actualiza los datos de perfil del usuario autenticado.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de perfil.
 *
 * @returns El nuevo estado del formulario con el resultado de la actualización.
 */
export const updateProfile = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const sesionVerificada = await verifySession();

  // Si no hay sesión autenticada, se devuelve un estado de error
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para actualizar tu perfil",
      payload: formData
    };
  }

  // Se validan los datos del formulario usando el esquema definido con Zod
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormularioPerfil> = profileSchema.safeParse(datos);

  // Si la validación falla, se devuelve un estado de error
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Si la validación es exitosa, se procede a actualizar el perfil del usuario
  try {
    const nuevaContrasena: string = datosValidados.data.password;
    const ficheroImagen = formData.get("imagen");

    let passwordCifrado: string | null = null;
    let urlImagen: string | undefined = undefined;

    if (nuevaContrasena) {
      const salCifrado: number = 10;
      passwordCifrado = await bcrypt.hash(nuevaContrasena, salCifrado);
    }

    // Si existe el fichero de imagen se guarda, si no se puede guardar se devuelve un estado de error
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

    // Se actualizan los datos del usuario en la base de datos, incluyendo la nueva imagen y contraseña si se proporcionaron
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

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Guarda el archivo de imagen de perfil en el servidor.
 * Valida el formato y tamaño del archivo antes de guardarlo.
 * El archivo se guarda con el ID del usuario y la fecha actual para evitar colisiones.
 *
 * @param file El archivo de imagen a guardar
 * @param userID El ID del usuario al que pertenece la imagen
 * @returns Un objeto con la URL de la imagen guardada, o un mensaje de error
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

  if (file.size > MAX_SIZE_BYTES) {
    return { error: "La imagen no puede superar los 5 MB." };
  }

  const extension = extname(file.name) || ".jpg";
  const filename = `${userID}-${Date.now()}${extension}`;
  const uploadDir = join(process.cwd(), "public", "uploads", "profiles");
  const filepath = join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  const imagenUrl = `/uploads/profiles/${filename}`;

  return { imagen: imagenUrl };
};

/**
 * Server action que sube una imagen de perfil para el usuario autenticado.
 * Valida la sesión, procesa el archivo de imagen y actualiza la URL en la base de datos.
 *
 * @param formData FormData que debe contener el campo "imagen" con el archivo a subir
 * @returns Un objeto con la URL de la imagen subida, o un mensaje de error
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

"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { extname } from "path";
import { join } from "path";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const uploadProfileImage = async (formData: FormData): Promise<{ error?: string; imagen?: string }> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return { error: "Debes iniciar sesión para subir una imagen" };
  }

  const file = formData.get("imagen");

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
  const filename = `${sesionVerificada.session.userID}-${Date.now()}${extension}`;
  const uploadDir = join(process.cwd(), "public", "uploads", "profiles");
  const filepath = join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  const imagenUrl = `/uploads/profiles/${filename}`;

  await prisma.usuario.update({
    where: { id: sesionVerificada.session.userID },
    data: { imagen: imagenUrl }
  });

  return { imagen: imagenUrl };
};

export default uploadProfileImage;

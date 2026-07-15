import { mkdir, writeFile } from "fs/promises";
import { extname, join } from "path";
import { BasicError } from "../types/index.js";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Save an image file into `public/uploads/{folder}` and return its public URL.
 *
 * @param file The image file to save
 * @param ownerID The ID of the owner of the image (used in the filename)
 * @param folder The folder under `public/uploads` where the image will be saved
 *
 * @returns A BasicError on failure, or the public URL string of the saved image.
 */
const saveImage = async (file: File, ownerID: number | string, folder: string): Promise<BasicError | string> => {
  if (!(file instanceof File) || file.size === 0) {
    return {
      error: "no_file_provided",
      message: "No file provided"
    };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      error: "invalid_image_type",
      message: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF."
    };
  }

  if (file.size > MAX_SIZE_IN_BYTES) {
    return {
      error: "image_too_large",
      message: "El tamaño de la imagen no puede exceder los 5 MB."
    };
  }

  const ext = extname(file.name) || ".jpg";
  const fileName = `${ownerID}-${Date.now()}${ext}`;
  const uploadDir = join(process.cwd(), "public", "uploads", folder);
  const filePath = join(uploadDir, fileName);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, buffer);
  } catch {
    return {
      error: "image_save_failed",
      message: "No se pudo guardar la imagen. Intenta nuevamente."
    };
  }

  return `/uploads/${folder}/${fileName}`;
};

export { saveImage };

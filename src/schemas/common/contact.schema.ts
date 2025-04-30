import { z } from "zod";

/**
 * Esquema para la validación de los datos del formulario de contacto
 */
const contactSchema = z.object({
  name: z.string({ message: "El nombre no es válido" }).trim(),
  email: z
    .string()
    .email({ message: "El correo no es válido" })
    .nonempty("El correo es obligatorio.")
    .trim(),
  msg: z
    .string()
    .min(20, { message: "El mensaje debe tener al menos 20 caracteres." })
    .nonempty("El mensaje es obligatorio.")
    .trim()
});

export default contactSchema;

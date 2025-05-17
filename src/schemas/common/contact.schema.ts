import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string({ message: "El nombre no es válido" })
    .min(2, { message: "El nombre debe tener más de 1 carácter." })
    .trim(),
  email: z
    .string()
    .email({ message: "El correo no es válido" })
    .min(1, { message: "El email es obligatorio" })
    .trim(),
  msg: z.string().min(20, { message: "El mensaje debe tener al menos 20 caracteres" }).trim()
});

export default contactSchema;

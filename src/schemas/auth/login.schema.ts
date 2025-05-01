import { z } from "zod";

/**
 * Esquema para la validación de los datos del formulario de acceso
 */
const logInSchema = z.object({
  email: z
    .string()
    .email({ message: "El correo no es válido" })
    .min(1, { message: "El email es obligatorio" })
    .trim(),
  password: z
    .string({ message: "La contraseña no es válida" })
    .min(15, { message: "La contraseña tiene que tener 15 caracteres min" })
    .trim()
});

export default logInSchema;

import { z } from "zod";

/**
 * Esquema para la validación de los datos del formulario de contacto
 */
const logInSchema = z.object({
  email: z.string().email({ message: "El correo no es válido" }).trim(),
  password: z.string().min(15, { message: "La contraseña tiene que tener 15 min." }).trim()
});

export default logInSchema;

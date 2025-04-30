import { z } from "zod";

/**
 * Esquema para la validación de los datos del formulario de contacto
 */
const logInSchema = z.object({
  email: z
    .string()
    .email({ message: "El correo no es válido" })
    .nonempty("El correo es obligatorio.")
    .trim(),
  password: z.string().nonempty("La contraseña es obligatoria.").trim()
});

export default logInSchema;

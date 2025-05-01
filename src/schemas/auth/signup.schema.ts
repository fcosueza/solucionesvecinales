import { z } from "zod";
import { UserRoles } from "@/types/types";

/**
 * Esquema para la validación de los datos del formulario de registro
 */
const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "El correo no es válido" })
      .min(1, { message: "El email es obligatorio" })
      .trim(),
    rol: z.nativeEnum(UserRoles),
    username: z.string({ message: "El nombre de usuario no es válido" }).trim(),
    name: z
      .string({ message: "El nombre no es valido" })
      .min(1, { message: "El nombre es obligatorio" })
      .trim(),
    surname: z
      .string({ message: "El apellido no es válido" })
      .min(1, { message: "El apellido es obligatorio" })
      .trim(),
    address: z
      .string({ message: "La calle no es válida" })
      .min(1, { message: "La calle es obligatoria" })
      .trim(),
    number: z
      .number({ message: "El número no es válido" })
      .gte(1, { message: "El número tiene que ser mayor o igual que 1" })
      .min(1, { message: "El número es obligatorio" }),
    floor: z
      .number({ message: "El piso no es válido" })
      .gte(0, { message: "El piso tiene que ser igual o mayor que 0." }),
    letter: z
      .string({ message: "La letra no es válida" })
      .max(1, { message: "La letra solo puede contener un carácter" })
      .trim(),
    city: z
      .string({ message: "La localidad no es válida" })
      .min(1, { message: "La localidad es obligatoria" })
      .trim(),
    password: z
      .string({ message: "La contraseña no es válida" })
      .min(15, { message: "La contraseña tiene que tener 15 caracteres min." })
      .trim(),
    password_repeat: z
      .string({ message: "La contraseña no es válida" })
      .min(15, { message: "La contraseña tiene que tener 15 caracteres min." })
      .trim()
  })
  .refine(data => data.password === data.password_repeat, {
    message: "Las contraseñas deben coincidir",
    path: ["password_repeat"]
  });

export default signUpSchema;

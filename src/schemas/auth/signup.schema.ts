import { z } from "zod";
import { UserRole } from "@/types";

const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "El correo no es válido" })
      .min(1, { message: "El email es obligatorio" })
      .trim(),
    role: z.nativeEnum(UserRole),
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
    number: z.coerce
      .number({ message: "El número no es válido" })
      .min(1, { message: "El número es obligatorio" }),
    floor: z.coerce.number({ message: "El piso no es válido" }),
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

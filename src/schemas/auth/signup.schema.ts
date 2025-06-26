import { z } from "zod";
import { UserRole } from "@/types";

const signUpSchema = z
  .object({
    name: z
      .string({ message: "El nombre no es valido" })
      .min(1, { message: "El nombre es obligatorio" })
      .trim(),
    surname: z
      .string({ message: "El apellido no es válido" })
      .min(1, { message: "El apellido es obligatorio" })
      .trim(),
    role: z.nativeEnum(UserRole),
    email: z
      .string()
      .email({ message: "El correo no es válido" })
      .min(1, { message: "El email es obligatorio" })
      .trim(),
    password: z
      .string({ message: "La contraseña no es válida" })
      .min(15, { message: "La contraseña tiene que tener 15 caracteres min." })
      .trim(),
    repeat: z
      .string({ message: "La contraseña no es válida" })
      .min(15, { message: "La contraseña tiene que tener 15 caracteres min." })
      .trim()
  })
  .refine(data => data.password === data.repeat, {
    message: "Las contraseñas deben coincidir",
    path: ["password_repeat"]
  });

export default signUpSchema;

import { z } from "zod";

const passwordOptionalUpdate = z.union([
  z.literal(""),
  z
    .string({ message: "La contraseña no es válida" })
    .min(15, { message: "La contraseña tiene que tener 15 caracteres min." })
    .trim()
]);

const profileSchema = z
  .object({
    name: z
      .string({ message: "El nombre no es válido" })
      .min(2, { message: "El nombre debe tener más de 1 carácter." })
      .trim(),
    surname: z
      .string({ message: "El apellido no es válido" })
      .min(2, { message: "El apellido debe tener más de 1 carácter." })
      .trim(),
    email: z
      .string()
      .email({ message: "El correo no es válido" })
      .min(1, { message: "El email es obligatorio" })
      .trim(),
    password: passwordOptionalUpdate,
    repeat: passwordOptionalUpdate
  })
  .refine(
    data => {
      // Si ambos campos están vacíos, no se actualiza la contraseña.
      if (!data.password && !data.repeat) return true;

      return data.password === data.repeat;
    },
    {
      message: "Las contraseñas deben coincidir",
      path: ["repeat"]
    }
  );

export default profileSchema;

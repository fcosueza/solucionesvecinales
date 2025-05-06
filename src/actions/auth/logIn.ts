"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types/types";
import logInSchema from "@/schemas/auth/login.schema";

/**
 * Server Action logIn
 *
 * Función de tipo Server Action que se encarga de comprobar los credenciales introducidos por un usuario.
 *
 * @param prevState Estado previo del componente pasado como parámetro.
 * @param formData Parámetro de tipo FormData con todos los datos del formulario que lo envía.
 *
 * @returns Promesa con la resolución de la creación en la base de datos.
 */

const logIn = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = logInSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      message: "Error",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Intentamos crear el mensaje en la base de datos
  const user = await prisma.credentials.findUnique({
    where: {
      user: validatedData.data.email
    }
  });

  // Si no existe el usuario
  if (!user) {
    return {
      message: "Error",
      errors: {
        email: "No existe ningún usuario con ese correo."
      },
      payload: formData
    };
  }

  // Si la contraseña no es correcta.
  if (user.password !== validatedData.data.password)
    return {
      message: "Error",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: formData
    };

  return {
    message: "Success: Usuario encontrado!!"
  };
};

export default logIn;

"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types";
import logInSchema from "@/schemas/auth/login.schema";

const logInAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = logInSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Los datos no son correctos",
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
      state: "error",
      message: "Los datos no son correctos.",
      errors: {
        email: "No existe ningún usuario con ese correo."
      },
      payload: formData
    };
  }

  // Si la contraseña no es correcta.
  if (user.password !== validatedData.data.password)
    return {
      state: "error",
      message: "Los datos no son correctos",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: formData
    };

  return {
    state: "success",
    message: "Usuario y contraseña correctos"
  };
};

export default logInAction;

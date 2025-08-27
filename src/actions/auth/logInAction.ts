"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types";
import logInSchema from "@/schemas/auth/login.schema";

const logInAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData = Object.fromEntries(formData);
  const validatedData = logInSchema.safeParse(rawData);

  // If data is not valid
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Try to find user and credentials
  const user = await prisma.user.findUnique({
    where: {
      email: validatedData.data.email
    },
    include: {
      credentials: true
    }
  });

  // User doesn't exits
  if (!user) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: {
        email: "No existe ningún usuario con ese correo"
      },
      payload: formData
    };
  }

  // Incorrect password
  if (user.credentials?.password !== validatedData.data.password)
    return {
      state: "error",
      message: "Incorrect form data",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: formData
    };

  // User and password are corrects
  return {
    state: "success",
    message: "User and password are correct",
    payload: formData
  };
};

export default logInAction;

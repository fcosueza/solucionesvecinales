"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types";
import logInSchema from "@/schemas/auth/login.schema";

const logInAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = logInSchema.safeParse(fieldData);

  // If data is not valid
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Try to find user
  const user = await prisma.credentials.findUnique({
    where: {
      user: validatedData.data.email
    }
  });

  // User doesn't exits
  if (!user) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: {
        email: "No existe ningún usuario con ese correo."
      },
      payload: formData
    };
  }

  // Incorrect password
  if (user.password !== validatedData.data.password)
    return {
      state: "error",
      message: "Incorrect form data",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: formData
    };

  // User and password corrects
  return {
    state: "success",
    message: "User and password are correct",
    payload: formData
  };
};

export default logInAction;

"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types";
import signUpSchema from "@/schemas/auth/signup.schema";

const signUpAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = signUpSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Incorrect form data.",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Intentamos crear el usuario
  const user = await prisma.user.create({
    data: {
      email: validatedData.data.email,
      role: validatedData.data.role,
      name: validatedData.data.name,
      surname: validatedData.data.surname
    }
  });

  // Si no se puede crear el usuario, revolvemos un error.
  if (!user) {
    return {
      state: "error",
      message: "User can't be created.",
      payload: formData
    };
  }

  // Intentamos crear los credenciales
  const cred = await prisma.credentials.create({
    data: {
      user: validatedData.data.email,
      password: validatedData.data.password
    }
  });

  // Si no se puede crear el usuario, revolvemos un error.
  if (!cred) {
    return {
      state: "error",
      message: "Credentials can`t be created.",
      payload: formData
    };
  }

  // Si se ha podido crear todo bien, redireccionamos a la página de log in
  return {
    state: "success",
    message: "User created",
    payload: formData
  };
};

export default signUpAction;

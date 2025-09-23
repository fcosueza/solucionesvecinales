"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import logInSchema from "@/schemas/auth/login.schema";
import { FormActionState, UserRole } from "@/types";
import { SafeParseReturnType } from "zod";
import { createSession } from "@/lib/session";
import z from "zod";

type LogInFields = z.infer<typeof logInSchema>;

const logInAction = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, LogInFields> = logInSchema.safeParse(rawData);

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
  if (!user || !user.credentials) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: {
        email: "No existe ningún usuario con ese correo"
      },
      payload: formData
    };
  }

  const passwordMatch: boolean = await bcrypt.compare(validatedData.data.password, user.credentials.password);

  // Incorrect password
  if (!passwordMatch)
    return {
      state: "error",
      message: "Incorrect form data",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: formData
    };

  // User and password are corrects
  await createSession(user.id, user.role as UserRole);

  return {
    state: "success",
    message: "User and password are correct",
    payload: formData
  };
};

export default logInAction;

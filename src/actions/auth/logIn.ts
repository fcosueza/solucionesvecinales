"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import logInSchema from "@/schemas/auth/login.schema";
import { FormActionState, UserRole } from "@/types";
import { SafeParseReturnType } from "zod";
import { crearSesion } from "@/lib/session";
import z from "zod";

type CamposLogin = z.infer<typeof logInSchema>;

// Doesn't include password and repeat fields in the payload to avoid sending sensitive information back to the client
const safePayload = (formData: FormData): FormData => {
  const safe = new FormData();

  for (const [key, value] of formData.entries()) {
    if (key === "password") continue;
    safe.append(key, value);
  }

  return safe;
};

/**
 * Authenticates a user with email and password and creates a session when credentials are valid.
 *
 * @param _prevState Previous form action state
 * @param formData Login form payload
 * @returns Form action state with validation result and optional redirect path
 */
const logIn = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, CamposLogin> = logInSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: "error",
      message: "Validación de datos del formulario fallida",
      errors: validatedData.error.flatten().fieldErrors,
      payload: safePayload(formData)
    };
  }

  const usuario = await prisma.user.findUnique({
    where: {
      email: validatedData.data.email
    },
    include: {
      credentials: true
    }
  });

  if (!usuario || !usuario.credentials) {
    return {
      state: "error",
      message: "Validación de datos del formulario fallida",
      errors: {
        email: "No existe un usuario con este correo electrónico en la base de datos."
      },
      payload: safePayload(formData)
    };
  }

  const passwordMatch: boolean = await bcrypt.compare(validatedData.data.password, usuario.credentials.password);

  if (!passwordMatch)
    return {
      state: "error",
      message: "Validación de datos del formulario fallida",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: safePayload(formData)
    };

  await crearSesion(usuario.id, usuario.role as UserRole);

  const redirectTo = usuario.role === UserRole.webAdmin ? "/backoffice/overview" : "/communities";

  return {
    state: "success",
    message: "El nombre de usuario y la contraseña son correctos",
    redirectTo
  };
};

export default logIn;

"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import logInSchema from "@/schemas/auth/login.schema";
import { FormActionState, UserRole } from "@/types";
import { SafeParseReturnType } from "zod";
import { crearSesion } from "@/lib/session";
import z from "zod";

type CamposLogin = z.infer<typeof logInSchema>;

/**
 * Create a new FormData with the same fields as the original except "password",
 * to prevent the password from being forwarded to the client in case of error.
 *
 * @param formData - The original FormData sent from the form.
 *
 * @returns Un new FormData without the "password" field.
 */
const safePayload = (formData: FormData): FormData => {
  const safe = new FormData();

  for (const [key, value] of formData.entries()) {
    if (key === "password") continue;
    safe.append(key, value);
  }

  return safe;
};

/**
 * Validates the user's credentials, checks their password, and creates the session if access is correct.
 *
 * @param _prevState Previous state of the form action.
 * @param formData Data sent from the login form.
 *
 * @returns El new state of the action with the authentication result.
 */

const logIn = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposLogin> = logInSchema.safeParse(datos);

  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: safePayload(formData)
    };
  }

  // Find the user and their credentials
  const usuario = await prisma.user.findUnique({
    where: {
      email: datosValidados.data.email
    },
    include: {
      credentials: true
    }
  });

  // The user does not exist
  if (!usuario || !usuario.credentials) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        email: "No existe ningún usuario con ese correo"
      },
      payload: safePayload(formData)
    };
  }

  // Compare the provided password with the stored hash
  const passwordMatch: boolean = await bcrypt.compare(datosValidados.data.password, usuario.credentials.password);

  // Password incorrecto
  if (!passwordMatch)
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: safePayload(formData)
    };

  // The username and password are correct
  await crearSesion(usuario.id, usuario.role as UserRole);

  const redirectTo = usuario.role === UserRole.webAdmin ? "/backoffice/overview" : "/communities";

  return {
    state: "success",
    message: "El usuario y la contraseña son correctos",
    redirectTo
  };
};

export default logIn;

"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import logInSchema from "@/schemas/auth/login.schema";
import { FormActionState, UserRole } from "@/types";
import { SafeParseReturnType } from "zod";
import { createSession } from "@/lib/session";
import z from "zod";

type LogInFields = z.infer<typeof logInSchema>;

/**
 * Valida las credenciales del usuario, comprueba su contraseña y crea la sesión si el acceso es correcto.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de inicio de sesión.
 * @returns El nuevo estado de la acción con el resultado de la autenticación.
 */

const logInAction = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, LogInFields> = logInSchema.safeParse(rawData);

  // Si los datos no son válidos
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // Buscar el usuario y sus credenciales
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: validatedData.data.email
    },
    include: {
      credenciales: true
    }
  });

  // El usuario no existe
  if (!usuario || !usuario.credenciales) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        email: "No existe ningún usuario con ese correo"
      },
      payload: formData
    };
  }

  const passwordMatch: boolean = await bcrypt.compare(validatedData.data.password, usuario.credenciales.password);

  // Contraseña incorrecta
  if (!passwordMatch)
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        password: "La contraseña no es válida para este usuario."
      },
      payload: formData
    };

  // El usuario y la contraseña son correctos
  await createSession(usuario.id, usuario.role as UserRole);

  return {
    state: "success",
    message: "El usuario y la contraseña son correctos"
  };
};

export default logInAction;

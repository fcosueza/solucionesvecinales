"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import signUpSchema from "@/schemas/auth/signup.schema";
import { FormActionState } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposRegistro = z.infer<typeof signUpSchema>;

/**
 * Create a secure payload to return to the client in case of error, excluding sensitive fields such as passwords.
 *
 * @param formData Original data from the form sent by the client.
 * @returns Un Secure FormData object that excludes sensitive fields.
 */
const safePayload = (formData: FormData): FormData => {
  const safe = new FormData();

  for (const [key, value] of formData.entries()) {
    if (key === "password" || key === "repeat") continue;
    safe.append(key, value);
  }

  return safe;
};

/**
 * Validates registration data, creates the user and stores their credentials securely.
 *
 * @param _prevState Previous state of the form action.
 * @param formData Data sent from the registration form.
 *
 * @throws If data validation fails or an error occurs while creating the user, an error status with details is returned.
 * @returns El new state of the action with the result of the registration.
 */

const signUp = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposRegistro> = signUpSchema.safeParse(datos);

  // If validation fails, return an error status with details of the errors.
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: safePayload(formData)
    };
  }

  // The password is encrypted before being stored, using bcrypt.
  const salCifrado: number = 10;
  const hashedPassword: string = await bcrypt.hash(datosValidados.data.password, salCifrado);

  // Try to create the user and their credentials
  try {
    await prisma.user.create({
      data: {
        email: datosValidados.data.email,
        role: datosValidados.data.role,
        name: datosValidados.data.name,
        lastName: datosValidados.data.surname,
        credentials: {
          create: {
            password: hashedPassword
          }
        }
      }
    });
  } catch (error: any) {
    return {
      state: "error",
      message: "No se pudo crear el usuario",
      errors: {
        prisma: error.message
      },
      payload: safePayload(formData)
    };
  }

  // Successfully created user
  return {
    state: "success",
    message: "Usuario creado correctamente"
  };
};

export default signUp;

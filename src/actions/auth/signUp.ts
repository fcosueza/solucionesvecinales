"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import signUpSchema from "@/schemas/auth/signup.schema";
import { FormActionState } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposRegistro = z.infer<typeof signUpSchema>;

/**
 * Valida los datos de registro, crea el usuario y almacena sus credenciales de forma segura.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de registro.
 *
 * @throws Si la validación de los datos falla o si ocurre un error al crear el usuario, se devuelve un estado de error con detalles.
 * @returns El nuevo estado de la acción con el resultado del registro.
 */

const safePayload = (formData: FormData): FormData => {
  const safe = new FormData();

  for (const [key, value] of formData.entries()) {
    if (key === "password" || key === "repeat") continue;
    safe.append(key, value);
  }

  return safe;
};

const signUp = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposRegistro> = signUpSchema.safeParse(datos);

  // Si la validación falla, devolver un estado de error con los detalles de los error.
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: safePayload(formData)
    };
  }

  const salCifrado: number = 10;
  const hashedPassword: string = await bcrypt.hash(datosValidados.data.password, salCifrado);

  // Intentar crear el usuario y sus credenciales
  try {
    await prisma.usuario.create({
      data: {
        email: datosValidados.data.email,
        rol: datosValidados.data.role,
        nombre: datosValidados.data.name,
        apellido: datosValidados.data.surname,
        credenciales: {
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

  // Usuario creado correctamente
  return {
    state: "success",
    message: "Usuario creado correctamente"
  };
};

export default signUp;

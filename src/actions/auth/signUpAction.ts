"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import signUpSchema from "@/schemas/auth/signup.schema";
import { FormActionState } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type SignInFields = z.infer<typeof signUpSchema>;

/**
 * Valida los datos de registro, crea el usuario y almacena sus credenciales de forma segura.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de registro.
 * @returns El nuevo estado de la acción con el resultado del registro.
 */

const signUpAction = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, SignInFields> = signUpSchema.safeParse(rawData);

  // Si los datos no son válidos
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  const saltRounds: number = 10;
  const hashedPassword: string = await bcrypt.hash(validatedData.data.password, saltRounds);

  // Intentar crear el usuario y sus credenciales
  try {
    await prisma.usuario.create({
      data: {
        email: validatedData.data.email,
        role: validatedData.data.role,
        nombre: validatedData.data.name,
        apellido: validatedData.data.surname,
        credenciales: {
          create: {
            password: hashedPassword
          }
        }
      }
    });
  } catch (e: any) {
    return {
      state: "error",
      message: "No se pudo crear el usuario",
      errors: {
        prisma: "Error interno"
      }
    };
  }

  // Usuario creado correctamente
  return {
    state: "success",
    message: "Usuario creado correctamente"
  };
};

export default signUpAction;

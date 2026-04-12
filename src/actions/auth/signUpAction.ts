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
 * @returns El nuevo estado de la acción con el resultado del registro.
 */

const signUpAction = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposRegistro> = signUpSchema.safeParse(datos);

  // Si los datos no son válidos
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors
    };
  }

  const salCifrado: number = 10;
  const hashedPassword: string = await bcrypt.hash(datosValidados.data.password, salCifrado);

  // Intentar crear el usuario y sus credenciales
  try {
    await prisma.usuario.create({
      data: {
        email: datosValidados.data.email,
        role: datosValidados.data.role,
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

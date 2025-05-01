"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types/types";
import signUpSchema from "@/schemas/auth/signup.schema";

const signUp = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const fieldData = Object.entries(formData);
  const validatedData = signUpSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      message: "Error",
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // Intentamos crear el mensaje en la base de datos
  const res = await prisma.usuario.create({
    data: {
      nombre: validatedData.data.name,
      correo: validatedData.data.email
    }
  });

  // Si no se puede crear un mensaje, revolvemos un error.
  if (!res) {
    throw new Error("No se ha podido crear el mensaje de contacto");
  }

  return {
    message: "Mensaje creado correctamente."
  };
};

export default signUp;

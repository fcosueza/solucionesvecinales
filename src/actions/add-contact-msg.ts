"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string({ invalid_type_error: "El nombre no es válido" }),
  email: z.string().email({ message: "El correo no es válido" }),
  msg: z.string({ invalid_type_error: "El mensaje debe tener al menos 20 caracteres." }).min(20)
});

/**
 * Action addContactMsg
 *
 * Función de tipo Action que se encarga de crear un nuevo mensaje de contacto en el servidor.
 *
 * @param prevState Estado previo del componente pasado como parámetro.
 * @param formData Parámetro de tipo FormData con todos los datos del formulario que lo envía.
 *
 * @returns Promesa con la resolución de la creación en la base de datos.
 */

const addContactMsg = async (prevState: any, formData: FormData): Promise<unknown> => {
  const validatedData = schema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    msg: formData.get("msg") as string
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  const res = await prisma.contacto.create({
    data: {
      nombre: validatedData.data.name,
      correo: validatedData.data.email,
      mensaje: validatedData.data.msg
    }
  });

  if (!res) {
    return {
      message: "Error: No se a podido crear el mensaje."
    };
  }

  return {
    message: "Mensaje creado correctamente."
  };
};

export default addContactMsg;

"use server";

import prisma from "@/lib/prisma";
import contactSchema from "@/schemas/common/contact.schema";
import { revalidatePath } from "next/cache";

/**
 * Server Action addContactMsg
 *
 * Función de tipo Server Action que se encarga de crear un nuevo mensaje de contacto en el servidor.
 *
 * @param prevState Estado previo del componente pasado como parámetro.
 * @param formData Parámetro de tipo FormData con todos los datos del formulario que lo envía.
 *
 * @returns Promesa con la resolución de la creación en la base de datos.
 */

const addContactMsg = async (prevState: any, formData: FormData): Promise<unknown> => {
  const validatedData = contactSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    msg: formData.get("msg") as string
  });

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // Intentamos crear el mensaje en la base de datos
  const res = await prisma.contacto.create({
    data: {
      nombre: validatedData.data.name,
      correo: validatedData.data.email,
      mensaje: validatedData.data.msg
    }
  });

  // Si no se puede crear un mensaje, revolvemos un error.
  if (!res) {
    throw new Error("No se ha podido crear el mensaje de contacto.");
  }

  revalidatePath("/");
  return {
    message: "Mensaje creado correctamente."
  };
};

export default addContactMsg;

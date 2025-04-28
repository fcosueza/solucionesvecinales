"use server";

import prisma from "@/lib/prisma";
import contactSchema from "@/schemas/common/contact.schema";

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
  const fieldData = Object.fromEntries(formData);
  const validatedData = contactSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // Intentamos crear el mensaje en la base de datos
  try {
    await prisma.contacto.create({
      data: {
        nombre: validatedData.data.name,
        correo: validatedData.data.email,
        mensaje: validatedData.data.msg
      }
    });
  } catch (e: any) {
    return {
      message: "Error: No se a podido crear el mensaje",
      errors: e.message
    };
  }

  return {
    message: "Mensaje creado correctamente."
  };
};

export default addContactMsg;

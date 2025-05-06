"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types/types";
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

const addContactMsg = async (
  prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = contactSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      message: "Error",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Intentamos crear el mensaje en la base de datos
  try {
    await prisma.contact.create({
      data: {
        name: validatedData.data.name,
        email: validatedData.data.email,
        message: validatedData.data.msg
      }
    });
  } catch (e: any) {
    return {
      message: "Error: No se a podido crear el mensaje",
      errors: e.message,
      payload: formData
    };
  }

  return {
    message: "Success: Mensaje creado correctamente."
  };
};

export default addContactMsg;

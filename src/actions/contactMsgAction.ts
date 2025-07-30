"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types";
import contactSchema from "@/schemas/common/contact.schema";

const contactMsgAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = contactSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Incorrect form data.",
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
      state: "error",
      message: "Message cant't be created.",
      errors: e.message,
      payload: formData
    };
  }

  return {
    state: "success",
    message: "Message created successfully",
    payload: formData
  };
};

export default contactMsgAction;

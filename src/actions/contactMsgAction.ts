"use server";

import prisma from "@/lib/prisma";
import contactSchema from "@/schemas/common/contact.schema";
import { FormActionState } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type ContactFormFields = z.infer<typeof contactSchema>;

const contactMsgAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, ContactFormFields> = contactSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

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
      message: "Message cant't be created",
      errors: {
        prisma: e.message
      },
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

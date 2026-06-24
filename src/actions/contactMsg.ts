"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import contactSchema from "@/schemas/common/contact.schema";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { SafeParseReturnType } from "zod";
import z from "zod";

type contactFormFields = z.infer<typeof contactSchema>;

const contactMsg = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const data: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, contactFormFields> = contactSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      state: "error",
      message: "Invalid form data",
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
  } catch {
    return {
      state: "error",
      message: "Failed to create the message",
      errors: {
        prisma: "Internal error"
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

const deleteContact = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const creadoEn = new Date(String(formData.get("creadoEn") ?? ""));

  if (!nombre || !email || isNaN(creadoEn.getTime())) return;

  try {
    await prisma.contact.delete({ where: { name_email_createdAt: { name: nombre, email, createdAt: creadoEn } } });
    revalidatePath("/backoffice/contacto");
  } catch {}
};

export { contactMsg, deleteContact };

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
      message: "Datos del formulario no válidos",
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
      message: "No se pudo crear el mensaje",
      errors: {
        prisma: "Error interno"
      },
      payload: formData
    };
  }

  return {
    state: "success",
    message: "Mensaje creado exitosamente",
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

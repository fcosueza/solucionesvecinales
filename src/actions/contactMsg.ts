"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import contactSchema from "@/schemas/common/contact.schema";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { SafeParseReturnType } from "zod";
import z from "zod";

type CamposFormContacto = z.infer<typeof contactSchema>;

/**
 * Processes the contact form, validates the data received and saves the message to the database.
 *
 * @param _prevState Previous state of the form action.
 * @param formData Data sent from the contact form.
 *
 * @throws If data validation fails or an error occurs while saving the message, an error status with details is returned.
 * @returns El new state of the action with the result of the operation.
 */

const contactMsg = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormContacto> = contactSchema.safeParse(datos);

  // If the data is invalid, return an error status with validation messages
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // We try to create the contact message in the database
  try {
    await prisma.contacto.create({
      data: {
        nombre: datosValidados.data.name,
        email: datosValidados.data.email,
        mensaje: datosValidados.data.msg
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

  // If everything was successful, return a success status
  return {
    state: "success",
    message: "Mensaje creado exitosamente",
    payload: formData
  };
};

/**
 * Server action that deletes a contact message. It can only be run by webAdmin.
 * Revalidate the contact backoffice path after deleting.
 *
 * @param formData FormData that must contain: name, email and createdIn of the message to be deleted
 */
const deleteContact = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  // Verify that the user is authenticated and has the webAdmin role
  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const creadoEn = new Date(String(formData.get("creadoEn") ?? ""));

  if (!nombre || !email || isNaN(creadoEn.getTime())) return;

  try {
    await prisma.contacto.delete({ where: { nombre_email_creadoEn: { nombre, email, creadoEn } } });
    revalidatePath("/backoffice/contacto");
  } catch {}
};

export { contactMsg, deleteContact };

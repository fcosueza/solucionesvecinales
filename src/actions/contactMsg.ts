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
 * Procesa el formulario de contacto, valida los datos recibidos y guarda el mensaje en la base de datos.
 *
 * @param _prevState Estado previo de la acción del formulario.
 * @param formData Datos enviados desde el formulario de contacto.
 *
 * @throws Si la validación de los datos falla o si ocurre un error al guardar el mensaje, se devuelve un estado de error con detalles.
 * @returns El nuevo estado de la acción con el resultado de la operación.
 */

const contactMsg = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const datos: object = Object.fromEntries(formData);
  const datosValidados: SafeParseReturnType<object, CamposFormContacto> = contactSchema.safeParse(datos);

  // Si los datos no son válidos, devolver un estado de error con los mensajes de validación
  if (!datosValidados.success) {
    return {
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: datosValidados.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Intentamos crear el mensaje de contacto en la base de datos
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

  // Si todo fue exitoso, devolver un estado de éxito
  return {
    state: "success",
    message: "Mensaje creado exitosamente",
    payload: formData
  };
};

/**
 * Server action que elimina un mensaje de contacto. Solo puede ser ejecutada por webAdmin.
 * Revalida la ruta del backoffice de contacto después de eliminar.
 *
 * @param formData FormData que debe contener: nombre, email y creadoEn del mensaje a eliminar
 */
const deleteContact = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  // Verificar que el usuario esté autenticado y tenga rol webAdmin
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

export { deleteContact };
export default contactMsg;

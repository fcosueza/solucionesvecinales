"use server";

import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import verifySession from "@/lib/dal";
import { revalidatePath } from "next/cache";

async function verifyWebAdmin(): Promise<boolean> {
  const session = await verifySession();
  return session.isAuth && session.session?.role === UserRole.webAdmin;
}

export async function deleteComunidad(formData: FormData): Promise<void> {
  if (!(await verifyWebAdmin())) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.comunidad.delete({ where: { id } });
    revalidatePath("/backoffice/comunidades");
    revalidatePath("/backoffice/overview");
  } catch {}
}

export async function deleteUsuario(formData: FormData): Promise<void> {
  if (!(await verifyWebAdmin())) return;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  try {
    await prisma.usuario.delete({ where: { id } });
    revalidatePath("/backoffice/usuarios");
    revalidatePath("/backoffice/overview");
  } catch {}
}

export async function deleteIncidencia(formData: FormData): Promise<void> {
  if (!(await verifyWebAdmin())) return;

  const comunidad = Number(formData.get("comunidad"));
  const usuario = String(formData.get("usuario") ?? "").trim();
  const fecha = new Date(String(formData.get("fecha") ?? ""));

  if (!comunidad || isNaN(comunidad) || !usuario || isNaN(fecha.getTime())) return;

  try {
    await prisma.incidencia.delete({
      where: { comunidad_usuario_fecha: { comunidad, usuario, fecha } }
    });
    revalidatePath("/backoffice/incidencias");
    revalidatePath("/backoffice/overview");
  } catch {}
}

export async function deleteZona(formData: FormData): Promise<void> {
  if (!(await verifyWebAdmin())) return;

  const nombre = String(formData.get("nombre") ?? "").trim();
  const comunidad = Number(formData.get("comunidad"));

  if (!nombre || !comunidad || isNaN(comunidad)) return;

  try {
    await prisma.zona.delete({
      where: { nombre_comunidad: { nombre, comunidad } }
    });
    revalidatePath("/backoffice/zonas-comunes");
    revalidatePath("/backoffice/overview");
  } catch {}
}

export async function deleteRegistro(formData: FormData): Promise<void> {
  if (!(await verifyWebAdmin())) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.registro.delete({ where: { id } });
    revalidatePath("/backoffice/finanzas");
    revalidatePath("/backoffice/overview");
  } catch {}
}

export async function deleteSolicitud(formData: FormData): Promise<void> {
  if (!(await verifyWebAdmin())) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.solicitud.delete({ where: { id } });
    revalidatePath("/backoffice/solicitudes");
    revalidatePath("/backoffice/overview");
  } catch {}
}

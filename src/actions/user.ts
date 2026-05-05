"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Server action que elimina un usuario de la base de datos. Solo puede ser ejecutada por un usuario con rol webAdmin.
 * Valida los permisos y revalida las rutas de usuarios y overview del backoffice después de eliminar.
 *
 * @param formData - FormData que debe contener el campo "id" con el ID del usuario a eliminar
 */

export const deleteUser = async (formData: FormData): Promise<void> => {
  const sesion = await verifySession();

  // Verificar que el usuario esté autenticado y tenga rol webAdmin
  if (!sesion.isAuth || sesion.session?.role !== UserRole.webAdmin) return;

  // Validar que el id sea un string no vacío
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  // Intentar eliminar el usuario y revalidar rutas.
  try {
    await prisma.usuario.delete({ where: { id } });
    revalidatePath("/backoffice/usuarios");
    revalidatePath("/backoffice/overview");
  } catch {}
};

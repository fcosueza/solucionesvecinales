"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Server action that removes a user from the database. It can only be executed by a user with the webAdmin role.
 * Validates permissions and revalidates backoffice user and overview paths after deleting.
 *
 * @param formData - FormData that must contain the "id" field with the ID of the user to be deleted
 */

export const deleteUser = async (formData: FormData): Promise<void> => {
  const sesion = await verifySession();

  // Verify that the user is authenticated and has the webAdmin role
  if (!sesion.isAuth || sesion.session?.role !== UserRole.webAdmin) return;

  // Validate that the id is a non-empty string
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  // Do not allow deleting a user who is still managing communities.
  const hasAdminCommunities = await prisma.comunidad.findFirst({
    where: { adminID: id },
    select: { id: true }
  });

  if (hasAdminCommunities) return;

  // Try to delete the user and revalidate routes.
  try {
    await prisma.usuario.delete({ where: { id } });
    revalidatePath("/backoffice/usuarios");
    revalidatePath("/backoffice/overview");
  } catch {}
};

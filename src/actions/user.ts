"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Deletes a user from backoffice when requested by a web administrator.
 *
 * @param _prevState Previous form action state
 * @param formData Form data containing the user identifier
 * @returns Form action state with authorization/validation/deletion result
 */
const deleteUser = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin)
    return {
      state: "error",
      message: "No estas autorizado para realizar esta acción"
    };

  const id = String(formData.get("id") ?? "").trim();

  if (!id)
    return {
      state: "error",
      message: "Se requiere un ID de usuario válido"
    };

  const hasAdminCommunities = await prisma.community.findFirst({
    where: { adminId: id },
    select: { id: true }
  });

  if (hasAdminCommunities)
    return {
      state: "error",
      message: "No se puede eliminar un usuario que aún administra comunidades"
    };

  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath("/backoffice/users");
    revalidatePath("/backoffice/overview");

    return {
      state: "success",
      message: "Usuario eliminado exitosamente"
    };
  } catch {
    return {
      state: "error",
      message: "No se pudo eliminar el usuario"
    };
  }
};

export { deleteUser };

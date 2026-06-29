"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";

export const deleteUser = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
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

  // if the user is an admin of any community, we cannot delete the user to avoid having a community without an admin
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

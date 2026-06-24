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
      message: "You are not authorized to delete users"
    };

  const id = String(formData.get("id") ?? "").trim();

  if (!id)
    return {
      state: "error",
      message: "A valid user ID is required"
    };

  const hasAdminCommunities = await prisma.community.findFirst({
    where: { adminId: id },
    select: { id: true }
  });

  // if the user is an admin of any community, we cannot delete the user to avoid having a community without an admin
  if (hasAdminCommunities)
    return {
      state: "error",
      message: "Cannot delete a user who still manages communities"
    };

  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath("/backoffice/users");
    revalidatePath("/backoffice/overview");

    return {
      state: "success",
      message: "User deleted successfully"
    };
  } catch {
    return {
      state: "error",
      message: "Could not delete user"
    };
  }
};

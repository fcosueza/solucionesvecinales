"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { BasicError, UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Server action that removes a user from the database. It can only be executed by a user with the webAdmin role.
 * Validates permissions and revalidates backoffice user and overview paths after deleting.
 *
 * @param formData - FormData that must contain the "id" field with the ID of the user to be deleted
 *
 * @returns A BasicError object if an error occurs, or void if the operation is successful
 */

export const deleteUser = async (formData: FormData): Promise<BasicError | void> => {
  const session = await verifySession();

  // Verify that the user is authenticated and has the webAdmin role
  if (!session.isAuth || session.session?.role !== UserRole.webAdmin)
    return {
      error: "unauthorized",
      message: "You are not authorized to delete users"
    };

  // Validate that the id is a non-empty string
  const id = String(formData.get("id") ?? "").trim();

  if (!id)
    return {
      error: "invalid_user_id",
      message: "A valid user ID is required"
    };

  // Do not allow deleting an admin user who is still managing communities.
  const hasAdminCommunities = await prisma.community.findFirst({
    where: { adminId: id },
    select: { id: true }
  });

  if (hasAdminCommunities)
    return {
      error: "user_is_community_admin",
      message: "Cannot delete a user who still manages communities"
    };

  // Try to delete the user and revalidate routes.
  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath("/backoffice/users");
    revalidatePath("/backoffice/overview");

    return;
  } catch {
    return {
      error: "delete_user_failed",
      message: "Could not delete user"
    };
  }
};

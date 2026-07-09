import "server-only";

import prisma from "@/lib/prisma";
import { BasicError } from "@/types";

/**
 * Delete a user by ID, checking first if the user is an admin of any community,
 * checking if the user exists and if is admin or any community, in which case the user
 * can't be deleted.
 *
 * @param id User id to delete
 * @returns A promise that resolves to null on success or a BasicError on failure
 */
const deleteUser = async (id: string): Promise<BasicError | null> => {
  const hasAdminCommunities = await prisma.community.findFirst({
    where: { adminId: id },
    select: { id: true }
  });

  if (hasAdminCommunities) {
    return {
      error: "user_is_community_admin",
      message: "No se puede eliminar un usuario que aun administra comunidades"
    };
  }

  try {
    await prisma.user.delete({ where: { id } });

    return null;
  } catch (error: unknown) {
    if ((error as { code?: string })?.code === "P2025") {
      return {
        error: "not_found",
        message: "No existe el usuario a eliminar"
      };
    }

    return {
      error: "delete_user_failed",
      message: "No se pudo eliminar el usuario"
    };
  }
};

export { deleteUser };

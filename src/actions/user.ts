"use server";

import verifySession from "@/lib/dal";
import { deleteUser as deleteUserById } from "@/lib/user";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Deletes a user from the database after verifying the session and checking for any administrative responsibilities.
 *
 * @param _prevState Previous form action state
 * @param formData Form data containing the user identifier
 *
 * @returns A promise that resolves to the new form action state after attempting to delete the user
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

  const deleteError = await deleteUserById(id);

  if (deleteError)
    return {
      state: "error",
      message: deleteError.message
    };

  revalidatePath("/backoffice/users");
  revalidatePath("/backoffice/overview");

  return {
    state: "success",
    message: "Usuario eliminado exitosamente"
  };
};

export { deleteUser };

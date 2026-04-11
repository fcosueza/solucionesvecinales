"use server";

import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Cierra la sesión actual del usuario y lo redirige a la página principal.
 *
 * @returns No devuelve ningún valor; finaliza redirigiendo al usuario.
 */

const logOutAction = async (): Promise<void> => {
  await deleteSession();
  redirect("/");
};

export default logOutAction;

"use server";

import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Cierra la sesión actual del usuario y lo redirige a la página principal.
 *
 * @returns No devuelve ningún valor; finaliza redirigiendo al usuario.
 */

const logOut = async (): Promise<void> => {
  await eliminarSesion();
  redirect("/");
};

export default logOut;

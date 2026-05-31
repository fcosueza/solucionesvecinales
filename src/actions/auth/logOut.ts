"use server";

import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Logs out the user's current session and redirects them to the main page.
 *
 * @returns No return no value; ends by redirecting the user.
 */

const logOut = async (): Promise<void> => {
  await eliminarSesion();
  redirect("/");
};

export default logOut;

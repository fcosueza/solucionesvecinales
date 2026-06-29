"use server";

import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Ends the current user session and redirects to the home page.
 */
const logOut = async (): Promise<void> => {
  await eliminarSesion();
  redirect("/");
};

export default logOut;

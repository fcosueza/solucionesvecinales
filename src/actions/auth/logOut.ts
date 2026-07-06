"use server";

import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Ends the current user session and redirects to the home page.
 *
 * @returns Promise<void> indicating the completion of the logout process.
 */
const logOut = async (): Promise<void> => {
  await deleteSession();
  redirect("/");
};

export default logOut;

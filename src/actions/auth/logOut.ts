"use server";

import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";

const logOut = async (): Promise<void> => {
  await eliminarSesion();
  redirect("/");
};

export default logOut;

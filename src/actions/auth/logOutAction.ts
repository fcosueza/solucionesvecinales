import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const logOutAction = async (): Promise<void> => {
  await deleteSession();
  redirect("/");
};

export default logOutAction;

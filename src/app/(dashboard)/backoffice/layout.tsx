import verifySession from "@/lib/dal";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";

export default async function BackOfficeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  if (sesionVerificada.session.role !== UserRole.webAdmin) {
    redirect("/communities");
  }

  return children;
}

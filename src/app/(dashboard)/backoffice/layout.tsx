import verifySession from "@/lib/dal";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";

/**
 * Backoffice design (web administration panel).
 * Verify that the authenticated user has the webAdmin role.
 * Redirects to communities if the user does not have the necessary permissions.
 *
 * @component
 * @param children Content of nested backoffice pages
 * @returns El layout del backoffice renderizado
 */
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

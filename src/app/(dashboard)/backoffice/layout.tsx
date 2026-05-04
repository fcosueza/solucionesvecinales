import verifySession from "@/lib/dal";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";

/**
 * Diseño del backoffice (panel de administración web).
 * Verifica que el usuario autenticado tenga el rol webAdmin.
 * Redirige a communities si el usuario no tiene los permisos necesarios.
 *
 * @component
 * @param children Contenido de las páginas anidadas del backoffice
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

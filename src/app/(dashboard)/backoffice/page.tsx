import { redirect } from "next/navigation";

/**
 * Página índice del backoffice.
 * Redirige automáticamente a la página de overview del backoffice.
 * Esta es la ruta principal de acceso al panel de administración.
 *
 * @component
 * @returns No devuelve contenido, solo redirige
 */
export default function BackOfficeIndexPage() {
  redirect("/backoffice/overview");
}

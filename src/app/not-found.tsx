import "../components/not-found.css";
import Link from "next/link";

/**
 * Error page 404 - Page not found.
 * Displayed when the user tries to access a route that does not exist on the platform.
 *
 * @returns The rendered 404 error page
 */
export default function NotFound() {
  return (
    <div className="notFound-container">
      <h2 className="notFound-header">404 - Página no encontrada</h2>
      <p className="notFound-para">Lo sentimos, el recurso que buscas no existe.</p>
      <Link className="notFound-link" href="/">
        Volver al inicio
      </Link>
    </div>
  );
}

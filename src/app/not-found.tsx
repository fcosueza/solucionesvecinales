import "../components/not-found.css";
import Link from "next/link";

/**
 * Página de error 404 - Página no encontrada.
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe en la plataforma.
 *
 * @returns La página de error 404 renderizada
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

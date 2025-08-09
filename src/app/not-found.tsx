import "../ui/not-found.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notFound-container">
      <h2 className="notFound-header">404 - Not Found</h2>
      <p className="notFound-para">Lo sentimos, el recurso que buscas no existe</p>
      <Link className="notFound-link" href="/">
        Volver a Inicio
      </Link>
    </div>
  );
}

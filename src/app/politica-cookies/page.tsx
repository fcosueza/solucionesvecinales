import Link from "next/link";
import type { Metadata } from "next";
import style from "../politicas/style.module.css";

export const metadata: Metadata = {
  title: "Política de Cookies | Soluciones Vecinales",
  description: "Información sobre el uso de cookies en Soluciones Vecinales"
};

export default function PoliticaCookiesPage(): React.ReactNode {
  return (
    <main className={style.main}>
      <header className={style.header}>
        <h1 className={style.title}>Política de Cookies</h1>
        <p className={style.updated}>Última actualización: 4 de mayo de 2026</p>
      </header>

      <section className={style.section}>
        <h2>1. Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas una web. Permiten
          que el sitio funcione correctamente y que recuerde cierta información de navegación.
        </p>
      </section>

      <section className={style.section}>
        <h2>2. Cookies que utilizamos</h2>
        <p>En Soluciones Vecinales utilizamos cookies técnicas y necesarias para operar la plataforma.</p>
        <ul>
          <li>Cookie de sesión: se utiliza para mantener la autenticación del usuario una vez iniciada la sesión.</li>
          <li>
            Cookies técnicas de seguridad: ayudan a proteger el acceso y prevenir usos no autorizados de la cuenta.
          </li>
        </ul>
      </section>

      <section className={style.section}>
        <h2>3. Finalidad</h2>
        <p>Las cookies necesarias se usan exclusivamente para:</p>
        <ul>
          <li>Permitir el inicio de sesión y la navegación segura.</li>
          <li>Mantener funcionalidades básicas de la aplicación.</li>
          <li>Proteger la integridad de la sesión del usuario.</li>
        </ul>
      </section>

      <section className={style.section}>
        <h2>4. Gestión de cookies</h2>
        <p>
          Puedes bloquear o eliminar cookies desde la configuración de tu navegador. Ten en cuenta que, si desactivas
          cookies necesarias, algunas funciones de la plataforma pueden dejar de estar disponibles.
        </p>
      </section>

      <section className={style.section}>
        <h2>5. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios legales, técnicos o funcionales. Publicaremos la
          versión vigente en esta misma página.
        </p>
      </section>

      <section className={style.section}>
        <h2>6. Contacto</h2>
        <p>
          Si tienes dudas sobre el uso de cookies, puedes escribirnos a través del formulario de contacto disponible en
          la página de inicio.
        </p>
      </section>

      <Link className={style.backLink} href="/">
        Volver al inicio
      </Link>
    </main>
  );
}

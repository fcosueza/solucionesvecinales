import Link from "next/link";
import type { Metadata } from "next";
import style from "../politicas/style.module.css";

export const metadata: Metadata = {
  title: "Política de Privacidad | Soluciones Vecinales",
  description: "Información sobre el tratamiento de datos personales en Soluciones Vecinales"
};

export default function PoliticaPrivacidadPage(): React.ReactNode {
  return (
    <main className={style.main}>
      <header className={style.header}>
        <h1 className={style.title}>Política de Privacidad</h1>
        <p className={style.updated}>Última actualización: 4 de mayo de 2026</p>
      </header>

      <section className={style.section}>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          Soluciones Vecinales es responsable del tratamiento de los datos personales facilitados por las personas
          usuarias de la plataforma.
        </p>
      </section>

      <section className={style.section}>
        <h2>2. Datos que tratamos</h2>
        <p>Podemos tratar las siguientes categorías de datos:</p>
        <ul>
          <li>Datos identificativos y de contacto (por ejemplo, nombre y correo electrónico).</li>
          <li>Datos de cuenta y perfil necesarios para el acceso y uso de la aplicación.</li>
          <li>Información enviada por la persona usuaria a través de formularios de contacto o soporte.</li>
          <li>Datos técnicos mínimos para garantizar la seguridad y funcionamiento del servicio.</li>
        </ul>
      </section>

      <section className={style.section}>
        <h2>3. Finalidades del tratamiento</h2>
        <p>Tratamos los datos para:</p>
        <ul>
          <li>Gestionar el alta, acceso y mantenimiento de cuentas de usuario.</li>
          <li>Prestar las funcionalidades de gestión de comunidades disponibles en la plataforma.</li>
          <li>Atender consultas, incidencias o solicitudes enviadas por los canales de contacto.</li>
          <li>Cumplir obligaciones legales aplicables.</li>
        </ul>
      </section>

      <section className={style.section}>
        <h2>4. Base jurídica</h2>
        <p>
          El tratamiento se basa en la ejecución de la relación de servicio con la persona usuaria, en el consentimiento
          cuando corresponda y en el cumplimiento de obligaciones legales.
        </p>
      </section>

      <section className={style.section}>
        <h2>5. Conservación de datos</h2>
        <p>
          Conservaremos los datos durante el tiempo necesario para prestar el servicio y, posteriormente, durante los
          plazos exigidos por la normativa aplicable.
        </p>
      </section>

      <section className={style.section}>
        <h2>6. Cesiones y acceso por terceros</h2>
        <p>
          No vendemos datos personales. Solo podrán acceder a ellos proveedores que actúen como encargados del
          tratamiento, bajo contrato y con medidas de seguridad adecuadas, o cuando exista obligación legal.
        </p>
      </section>

      <section className={style.section}>
        <h2>7. Derechos de las personas usuarias</h2>
        <p>
          La persona usuaria puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad.
        </p>
        <p>
          Para ello, puede utilizar el formulario de contacto de la plataforma indicando su solicitud y los datos
          necesarios para verificar su identidad.
        </p>
      </section>

      <section className={style.section}>
        <h2>8. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger los datos frente a accesos no autorizados,
          alteración o pérdida.
        </p>
      </section>

      <section className={style.section}>
        <h2>9. Cambios en esta política</h2>
        <p>
          Esta política puede actualizarse para adaptarse a cambios normativos o funcionales. La versión vigente estará
          siempre disponible en esta página.
        </p>
      </section>

      <Link className={style.backLink} href="/">
        Volver al inicio
      </Link>
    </main>
  );
}

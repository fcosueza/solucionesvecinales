import ContactForm from "@/components/layouts/Forms/ContactForm";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import verifySession from "@/lib/dal";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const helpContent: HelpContent = {
  title: "Ayuda: Contacto",
  summary: "Envía un mensaje al equipo de la plataforma.",
  steps: [
    "Rellena tu nombre y correo electrónico.",
    "Escribe tu mensaje (mínimo 20 caracteres).",
    "Pulsa 'Enviar mensaje' para enviarlo."
  ],
  constraints: ["El mensaje debe tener al menos 20 caracteres.", "El correo debe tener un formato válido."]
};

/**
 * Página de contacto del dashboard.
 * Proporciona un formulario de contacto para que los usuarios envíen consultas,
 * sugerencias o incidencias directamente al equipo de la plataforma.
 *
 * @component
 * @returns La página de contacto renderizada
 */
const ContactoPage = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <h1 className={style.title}>Contacto</h1>
      <p className={style.description}>¿Tienes alguna duda o sugerencia? Envíanos un mensaje.</p>
      <ContactForm />
    </main>
  );
};

export default ContactoPage;

import CommunityAddForm from "@/components/layouts/Forms/CommunityAddForm";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import ScrollToTopOnMount from "@/components/ui/ScrollToTop";
import verifySession from "@/lib/dal";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const helpContent: HelpContent = {
  title: "Ayuda: Crear comunidad",
  summary: "Permite registrar una comunidad nueva en la plataforma.",
  steps: [
    "Completa los datos básicos de la comunidad.",
    "Revisa dirección y nombre antes de guardar.",
    "Envía el formulario para crearla.",
    "Al finalizar, podrás gestionarla desde el dashboard."
  ],
  constraints: ["Disponible solo para roles autorizados.", "Los datos obligatorios deben estar completos."]
};

const NewCommunity = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdministrador) {
    redirect("/communities");
  }

  return (
    <>
      <PageHelpWidget content={helpContent} />
      <ScrollToTopOnMount />
      <main className={style.main}>
        <h1 className={style.title}>Añadir comunidad</h1>
        <p className={style.description}>
          Crea una nueva comunidad para que otros usuarios puedan descubrirla y unirse
        </p>
        <div className={style.formContainer}>
          <CommunityAddForm />
        </div>
      </main>
    </>
  );
};

export default NewCommunity;

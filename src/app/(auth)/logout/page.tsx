import Header from "@/components/layouts/Header";
import LogOutForm from "@/components/layouts/Forms/LogOutForm";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import style from "./style.module.css";

const helpContent: HelpContent = {
  title: "Ayuda: Cierre de sesión",
  summary: "Esta ruta finaliza tu sesión y te redirige.",
  steps: [
    "Entra en la opción Salir del menú.",
    "El sistema invalida tu sesión actual.",
    "Se redirige a una vista pública o de acceso."
  ],
  constraints: ["No puedes usar opciones del dashboard tras cerrar sesión."]
};

export default function LogOut() {
  return (
    <>
      <PageHelpWidget content={helpContent} />
      <Header links={[{ text: "Inicio", href: "/" }]} />
      <main className={style.main}>
        <LogOutForm questionText="¿Quieres cerrar sesión?" confirmText="Sí, salir" cancelText="No, volver" />
      </main>
    </>
  );
}

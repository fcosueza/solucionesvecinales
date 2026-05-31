import Header from "@/components/layouts/Header";
import LogInForm from "@/components/layouts/Forms/LogInForm";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

const enlacesCabecera: NavItem[] = [{ text: "Inicio", href: "/" }];

const helpContent: HelpContent = {
  title: "Ayuda: Iniciar sesión",
  summary: "Accede a tu cuenta para entrar al panel de comunidades.",
  steps: [
    "Escribe tu correo y contraseña.",
    "Pulsa el botón de acceso del formulario.",
    "Si los datos son válidos, entrarás al dashboard.",
    "Si no tienes cuenta, usa el enlace a registro."
  ],
  constraints: [
    "Solo usuarios registrados pueden continuar.",
    "Las credenciales deben coincidir con una cuenta activa."
  ]
};

/**
 * Login page.
 *
 * Allows registered users to authenticate to the platform using their credentials.
 * Includes a login form and links to register new users.
 *
 * @returns La rendered login page
 */
export default function LogIn() {
  return (
    <>
      <PageHelpWidget content={helpContent} />
      <Header links={enlacesCabecera} buttonText="Regístrate" buttonRoute="/signup" />
      <main className={style.main}>
        <LogInForm />
        <p className={style.para}>
          ¿Aún no tienes una cuenta? <Link href="/signup">Regístrate</Link> gratis.
        </p>
      </main>
    </>
  );
}

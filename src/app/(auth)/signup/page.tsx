import Header from "@/components/layouts/Header";
import SignUpForm from "@/components/layouts/Forms/SignUpForm";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

const enlacesCabecera: NavItem[] = [{ text: "Inicio", href: "/" }];

const helpContent: HelpContent = {
  title: "Ayuda: Registro",
  summary: "Crea una cuenta nueva para acceder al sistema.",
  steps: [
    "Completa los campos obligatorios del formulario.",
    "Revisa que el correo no tenga errores.",
    "Envía el formulario para crear tu cuenta.",
    "Después inicia sesión para entrar al dashboard."
  ],
  constraints: ["El correo debe ser único.", "Si faltan campos obligatorios, no se completará el registro."]
};

/**
 * Página de registro de nuevos usuarios.
 * Permite crear una nueva cuenta en la plataforma proporcionando datos personales y credenciales.
 * Incluye un formulario de registro y enlaces para usuarios que ya tienen cuenta.
 *
 * @component
 * @returns La página de registro renderizada
 */
export default function Register() {
  return (
    <>
      <PageHelpWidget content={helpContent} />
      <Header links={enlacesCabecera} buttonText="Iniciar sesión" buttonRoute="/login" />
      <main className={style.main}>
        <SignUpForm />
        <p className={style.para}>
          Si ya estás registrado, <Link href="/login">inicia sesión</Link> en tu cuenta.
        </p>
      </main>
    </>
  );
}

import Header from "@/ui/layouts/Header";
import Footer from "@/ui/layouts/Footer";
import SignUpForm from "@/ui/layouts/Forms/SignUpForm";
import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

const linksHeader: NavItem[] = [{ text: "Inicio", href: "/" }];

export default function Register() {
  return (
    <>
      <Header links={linksHeader} buttonText="Log In" buttonRoute="/login" />
      <main className={style.main}>
        <h2 className={style.title}>Registro de Usuarios</h2>
        <SignUpForm />
        <p className={style.para}>
          Si ya estas registrado, <Link href="/login">Inicia Sesión</Link> en tu cuenta.
        </p>
      </main>
      <Footer />
    </>
  );
}

import Header from "@/ui/layouts/Header";
import Footer from "@/ui/layouts/Footer";
import LoginForm from "@/ui/layouts/Forms/LoginForm";
import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

const linksHeader: NavItem[] = [{ text: "Inicio", href: "/" }];

export default function LogIn() {
  return (
    <>
      <Header links={linksHeader} buttonText="Registro" buttonRoute="/signup" />
      <main className={style.main}>
        <h2 className={style.title}>Inicio de Sesión</h2>
        <LoginForm />
        <p className={style.para}>
          ¿Aun no tienes una cuenta? <Link href="/signup">Regístrate</Link> de forma gratuita.
        </p>
      </main>
      <Footer />
    </>
  );
}

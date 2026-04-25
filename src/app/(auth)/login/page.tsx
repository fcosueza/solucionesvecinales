import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import LogInForm from "@/components/layouts/Forms/LogInForm";
import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

const enlacesCabecera: NavItem[] = [{ text: "Inicio", href: "/" }];

export default function LogIn() {
  return (
    <>
      <Header links={enlacesCabecera} buttonText="Regístrate" buttonRoute="/signup" />
      <main className={style.main}>
        <h2 className={style.title}>Iniciar sesión</h2>
        <LogInForm />
        <p className={style.para}>
          ¿Aún no tienes una cuenta? <Link href="/signup">Regístrate</Link> gratis.
        </p>
      </main>
      <Footer />
    </>
  );
}

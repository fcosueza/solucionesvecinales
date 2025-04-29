"use client";

import Header from "@/ui/layout/Header";
import Footer from "@/ui/layout/Footer";
import LoginForm from "@/ui/components/Forms/LoginForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types/types";
import style from "./style.module.css";

const linksHeader: NavItem[] = [{ text: "Inicio", href: "/" }];

/**
 * Página LogIn
 *
 * Página de la aplicación para que los usuarios puedan hacer login.
 *
 * @returns Nodo de React conteniendo la página de login con el formulario adecuado.
 */
export default function LogIn() {
  const router = useRouter();

  return (
    <>
      <Header
        menuLinks={linksHeader}
        buttonText="Registro"
        buttonFunc={() => router.push("/register")}
      />
      <main className={style.main}>
        <h2 className={style.title}>Inicio de Sesión</h2>
        <LoginForm />
        <p className={style.para}>
          ¿Aun no tienes una cuenta? <Link href="/register">Regístrate</Link> de forma gratuita.
        </p>
      </main>
      <Footer />
    </>
  );
}

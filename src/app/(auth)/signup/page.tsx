"use client";

import Header from "@/ui/layout/Header";
import Footer from "@/ui/layout/Footer";
import SignUpForm from "@/ui/components/Forms/SignUpForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types/types";
import style from "./style.module.css";

const linksHeader: NavItem[] = [{ text: "Inicio", href: "/" }];

/**
 * Página Register
 *
 * Página de la aplicación que permite a un usuarios registrarse si no se ha registrado aún.
 *
 * @returns Nodo de React conteniendo la página de registro con el formulario adecuado.
 */
export default function Register() {
  const router = useRouter();

  return (
    <>
      <Header
        menuLinks={linksHeader}
        buttonText="Log In"
        buttonFunc={() => router.push("/login")}
      />
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

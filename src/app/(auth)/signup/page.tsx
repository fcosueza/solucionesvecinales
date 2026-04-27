import Header from "@/components/layouts/Header";
import SignUpForm from "@/components/layouts/Forms/SignUpForm";
import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

const enlacesCabecera: NavItem[] = [{ text: "Inicio", href: "/" }];

export default function Register() {
  return (
    <>
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

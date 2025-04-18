"use client";

import Header from "@/ui/layout/Header";
import CTA from "@/ui/components/CTA";
import Image from "next/image";
import style from "./style.module.css";
import { NavItemData } from "@/types/types";

export default function Home() {
  const title = "Administra tu Comunidad de Vecinos de forma fácil";
  const para = `Nuestra aplicación te permite conectar desde cualquier dispositivo y 
    estar al tanto de todo lo que sucede en tu comunidad de vecinos. Solo tienes que registrarte y 
    empezar a disfrutar de ella de forma totalmente gratuita`;
  const links: NavItemData[] = [
    { text: "Inicio", url: "#home" },
    { text: "Características", url: "/about" },
    { text: "Contacto", url: "/contact" }
  ];

  return (
    <>
      <Header menuLinks={links} buttonText="Log In" buttonFunc={() => console.log("Hallo")} />
      <main className={style.main}>
        <section id="home" className={style.section}>
          <CTA
            title={title}
            para={para}
            buttonText="Regístrate ya!!"
            buttonFunc={() => console.log("Hallo")}
          />
          <Image
            src="assets/images/hero.svg"
            alt="Imagen de la pantalla de un monitor"
            width={700}
            height={400}
          />
        </section>
      </main>
    </>
  );
}

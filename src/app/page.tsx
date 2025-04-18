"use client";

import Header from "@/ui/layout/Header";
import CTA from "@/ui/components/CTA";
import Image from "next/image";
import style from "./style.module.css";
import { NavItemData } from "@/types/types";

export default function Home() {
  const title = "¡Tu comunidad, más conectada y organizada que nunca!";
  const para = `Gestiona incidencias, recibe avisos importantes, reserva espacios comunes y
    consulta las novedades de tu comunidad desde un solo lugar.  `;
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
            buttonText="Regístrate Ya!!"
            buttonFunc={() => console.log("Hallo")}
          />
          <Image
            src="assets/images/hero.svg"
            alt="Imagen de la pantalla de un monitor"
            width={700}
            height={400}
          />
        </section>
        <section id="motivation" className={style.section}>
          <div>
            <h2 className={style.motivation}>
              Con <span className={style.highlight}>nuestra app</span>, la organización es sencilla
              y <span className={style.highlight}>cada vecino cuenta</span>. Porque juntos, hacemos
              del lugar donde vivimos un mejor hogar.
            </h2>
          </div>
        </section>
      </main>
    </>
  );
}

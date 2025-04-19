"use client";

import Header from "@/ui/layout/Header";
import CTA from "@/ui/components/CTA";
import Image from "next/image";
import style from "./style.module.css";
import { NavItemData } from "@/types/types";

export default function Home() {
  const title = "¡Tu comunidad, más conectada y organizada que nunca!";
  const para = `Gestiona incidencias, recibe avisos importantes, reserva espacios comunes y
    consulta las novedades de tu comunidad desde cualquier lugar.`;
  const links: NavItemData[] = [
    { text: "Inicio", src: "#" },
    { text: "Características", src: "#about" },
    { text: "Contacto", src: "#contact" }
  ];

  return (
    <>
      <Header menuLinks={links} buttonText="Log In" buttonFunc={() => console.log("Hallo")} />
      <main className={style.main}>
        <section className={style.section}>
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
        <section id="about" className={style.zigzag}>
          <div className={style.section}>
            <Image
              src="assets/images/devices.svg"
              alt="Imagen de la pantalla de un monitor"
              width={600}
              height={500}
            />
            <div className={style.zigzag__text}>
              <h3 className={style.zigzag__title}>Adaptada a cualquier dispositivo</h3>
              <p className={style.zigzag__para}>
                Nuestra aplicación cuenta con una interfaz sencilla y adaptada a cualquier
                dispositivo, para que pueda ser usarla desde cualquier lugar.
              </p>
            </div>
          </div>
          <div className={style.section}>
            <div className={style.zigzag__text}>
              <h3 className={style.zigzag__title}>Centrada en la accesibilidad</h3>
              <p className={style.zigzag__para}>
                Con un diseño pensado para ser accesible a todos los usuarios, independientemente de
                sus problemas de accesibilidad.
              </p>
            </div>
            <Image
              src="assets/images/ally.svg"
              alt="Imagen de la pantalla de un monitor"
              width={600}
              height={500}
            />
          </div>
        </section>
        <footer></footer>
      </main>
    </>
  );
}

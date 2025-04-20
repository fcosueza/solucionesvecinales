"use client";

import Header from "@/ui/layout/Header";
import CTA from "@/ui/components/CTA";
import Footer from "@/ui/layout/Footer";
import Card from "@/ui/components/Card";
import Image from "next/image";
import style from "./style.module.css";
import { NavItem } from "@/types/types";
import { SocialIcon } from "@/types/types";

// Titulo y párrafo para el CTA
const titleHero = "¡Tu comunidad, más conectada y organizada que nunca!";
const paraHero = `Gestiona incidencias, recibe avisos importantes, reserva espacios comunes y
  consulta las novedades de tu comunidad!!`;

// Datos de los enlaces del los menús
const links: NavItem[] = [
  { text: "Inicio", href: "#" },
  { text: "Características", href: "#about" },
  { text: "Contacto", href: "#contact" },
  { text: "Login", href: "#login" }
];

// Iconos de redes sociales
const icons: SocialIcon[] = [
  {
    src: "/assets/icons/facebook.png",
    altText: "Facebook Icon",
    url: "https://www.facebook.com/",
    title: "Facebook",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/github.png",
    altText: "Github Icon",
    url: "https://www.github.com/",
    title: "Github",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/instagram.png",
    altText: "Instagram Icon",
    url: "https://www.instagram.com/",
    title: "Instagram",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/linkedin.png",
    altText: "LinkedIn Icon",
    url: "https://www.linkedin.com/",
    title: "LinkedIn",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/x.png",
    altText: "X Icon",
    url: "https://www.x.com/",
    title: "X",
    width: 50,
    height: 50
  }
];

// Datos para las tarjetas
const imageURL = "/assets/images/doc.svg";
const altText = "Imagen de unos documentos";
const title = "Lorem Ipsum Dolor";
const para = "Lorem Ipsum Dolor sit atmet consecter blabalbalbalbalbalalbalab";

/**
 * Página Home
 *
 * Página principal de la aplicación, compuesta de diferentes componentes como un Header,
 * secciones, footer, etc.
 *
 * @returns Nodo de React conteniendo la página principal.
 */
export default function Home() {
  return (
    <>
      <Header menuLinks={links} buttonText="Log In" buttonFunc={() => console.log("Hallo")} />

      <main className={style.main}>
        <section className={style.section}>
          <CTA
            title={titleHero}
            para={paraHero}
            buttonText="Regístrate Ya!!"
            buttonFunc={() => console.log("Hallo")}
          />
          <Image
            src="/assets/images/hero.svg"
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
              src="/assets/images/devices.svg"
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
              src="/assets/images/ally.svg"
              alt="Imagen de la pantalla de un monitor"
              width={600}
              height={500}
            />
          </div>
        </section>
        <section id="gallery">
          <Card
            imageURL={imageURL}
            imageAltText={altText}
            imageWidth={300}
            imageHeight={200}
            cardTitle={title}
            cardPara={para}
          />
        </section>
      </main>

      <Footer links={links} socialIcons={icons} />
    </>
  );
}

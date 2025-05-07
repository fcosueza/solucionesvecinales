import Header from "@/ui/layout/Header";
import CTA from "@/ui/components/CTA";
import Footer from "@/ui/layout/Footer";
import Card from "@/ui/components/Card";
import Gallery from "@/ui/layout/Gallery";
import ContactForm from "@/ui/components/Forms/ContactForm";
import Image from "next/image";
import { NavItem } from "@/types/types";
import { SocialIcon } from "@/types/types";
import style from "./style.module.css";

// Titulo y párrafo para el CTA
const titleHero = "¡Tu comunidad, más conectada y organizada que nunca!";
const paraHero = `Gestiona incidencias, recibe avisos importantes, reserva espacios comunes y
  consulta las novedades de tu comunidad!!`;

// Datos de los enlaces del los menús

const linksHeader: NavItem[] = [
  { text: "Inicio", href: "#" },
  { text: "Características", href: "#about" },
  { text: "Contacto", href: "#contact" }
];

const linksFooter: NavItem[] = [
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
const cardsData = [
  {
    imageURL: "/assets/images/notify.svg",
    altText: "Imagen de una notificación",
    title: "Tablón de Anuncios",
    para: "Consulta el tablón de anuncios de tu comunidad y mantente informado de todo lo que sucede."
  },
  {
    imageURL: "/assets/images/alert.svg",
    altText: "Imagen de un signo de exclamación",
    title: "Gestión de Incidencias",
    para: "Crea y gestiona incidencias en tu comunidad de forma eficiente y rápida desde cualquier lugar."
  },
  {
    imageURL: "/assets/images/sport.svg",
    altText: "Imagen de una portería de futbol y un portero",
    title: "Espacios Comunes",
    para: "Reserva los espacios comunes de tu comunidad para su disfrute el día y a la hora que quieras."
  },
  {
    imageURL: "/assets/images/financial.svg",
    altText: "Imagen de una mujer y un diagrama de barras.",
    title: "Consulta las Financias",
    para: "Consulta las finanzas de tu comunidad para estar siempre al tanto del balance anual."
  }
];

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
      <Header links={linksHeader} buttonText="Log In" buttonRoute="/login" />

      <main className={style.main}>
        <section className={style.section}>
          <CTA
            title={titleHero}
            para={paraHero}
            buttonText="Regístrate Ya!!"
            buttonRoute={"/signup"}
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
                Pensada para usarse desde cualquier dispositivo, para que puedas gestionar tu
                comunidad desde cualquier lugar.
              </p>
            </div>
          </div>
          <div className={style.section}>
            <div className={style.zigzag__text}>
              <h3 className={style.zigzag__title}>Centrada en la accesibilidad</h3>
              <p className={style.zigzag__para}>
                Con un diseño simple e intuitivo, nuestra aplicación pone especial énfasis en la
                accesibilidad y facilidad de uso.
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
          <Gallery>
            {cardsData.map(data => {
              return (
                <Card
                  imageURL={data.imageURL}
                  imageAltText={data.altText}
                  imageWidth={150}
                  imageHeight={150}
                  cardTitle={data.title}
                  cardPara={data.para}
                  key={data.imageURL}
                />
              );
            })}
          </Gallery>
        </section>
        <section className={style.section} id="contact">
          <div className={style.contact__text}>
            <h3 className={style.contact__title}>Contacta con nosotros!!!</h3>
            <p className={style.contact__para}>
              Si tienes alguna duda, sugerencia o simplemente quieres decir hola, no dudes en
              contactar con nosotros.
            </p>
            <Image
              src="assets/images/contact.svg"
              width={500}
              height={300}
              alt="Hombre mandando un correo"
            />
          </div>
          <ContactForm />
        </section>
      </main>

      <Footer links={linksFooter} socialIcons={icons} withLogo={true} />
    </>
  );
}

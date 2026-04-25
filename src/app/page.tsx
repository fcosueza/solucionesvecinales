import Header from "@/components/layouts/Header";
import CTA from "@/components/ui/CTA";
import Footer from "@/components/layouts/Footer";
import Card from "@/components/ui/Card";
import Gallery from "@/components/layouts/Gallery";
import ContactForm from "@/components/layouts/Forms/ContactForm";
import Image from "next/image";
import { NavItem } from "@/types";
import { SocialIcon } from "@/types";
import style from "./style.module.css";

const tituloHero = "¡Tu comunidad, más conectada y organizada que nunca!";
const parraHero = `Gestiona incidencias, recibe avisos importantes, reserva espacios comunes y
  consulta las novedades de tu comunidad.`;

const enlacesCabecera: NavItem[] = [
  { text: "Inicio", href: "#" },
  { text: "Características", href: "#about" },
  { text: "Contacto", href: "#contact" }
];

const enlacesFooter: NavItem[] = [
  { text: "Inicio", href: "#" },
  { text: "Mapa del Sitio", href: "#about" },
  { text: "Política de Privacidad", href: "#contact" }
];

const iconosSociales: SocialIcon[] = [
  {
    src: "/assets/icons/facebook.png",
    altText: "Icono de Facebook",
    url: "https://www.facebook.com/",
    title: "Facebook",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/github.png",
    altText: "Icono de GitHub",
    url: "https://www.github.com/",
    title: "Github",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/instagram.png",
    altText: "Icono de Instagram",
    url: "https://www.instagram.com/",
    title: "Instagram",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/linkedin.png",
    altText: "Icono de LinkedIn",
    url: "https://www.linkedin.com/",
    title: "LinkedIn",
    width: 50,
    height: 50
  },
  {
    src: "/assets/icons/x.png",
    altText: "Icono de X",
    url: "https://www.x.com/",
    title: "X",
    width: 50,
    height: 50
  }
];

// Datos para las tarjetas
const datosTarjetas = [
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
    title: "Consulta las finanzas",
    para: "Consulta las finanzas de tu comunidad para estar siempre al tanto del balance anual."
  }
];

export default function Home() {
  return (
    <>
      <Header links={enlacesCabecera} buttonText="Iniciar sesión" buttonRoute="/login" />

      <main className={style.main}>
        <section className={`${style.section} ${style.hero}`}>
          <CTA title={tituloHero} para={parraHero} buttonText="Regístrate ahora" buttonRoute={"/signup"} />
          <Image src="/assets/images/hero.svg" alt="Imagen de la pantalla de un monitor" className={style.hero__image} width={699} height={618} loading="eager"/>
        </section>

        <section id="motivation" className={style.section}>
          <div>
            <h2 className={style.motivation}>
              Con <span className={style.highlight}>nuestra app</span>, la organización es sencilla y{" "}
              <span className={style.highlight}>cada vecino cuenta</span>. Porque juntos, hacemos del lugar donde
              vivimos un mejor hogar.
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
                Pensada para usarse desde cualquier dispositivo, para que puedas gestionar tu comunidad desde cualquier
                lugar.
              </p>
            </div>
          </div>
          <div className={style.section}>
            <div className={style.zigzag__text}>
              <h3 className={style.zigzag__title}>Centrada en la accesibilidad</h3>
              <p className={style.zigzag__para}>
                Con un diseño simple e intuitivo, nuestra aplicación pone especial énfasis en la accesibilidad y
                facilidad de uso.
              </p>
            </div>
            <Image src="/assets/images/ally.svg" alt="Imagen de la pantalla de un monitor" width={600} height={500} />
          </div>
        </section>

        <section id="gallery">
          <Gallery>
            {datosTarjetas.map(data => {
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
            <h3 className={style.contact__title}>Contacta con nosotros</h3>
            <p className={style.contact__para}>
              Si tienes alguna duda, sugerencia o simplemente quieres saludarnos, no dudes en ponerte en contacto con
              nosotros.
            </p>
            <Image src="assets/images/contact.svg" width={500} height={300} alt="Hombre mandando un correo" />
          </div>
          <ContactForm />
        </section>
      </main>

      <Footer links={enlacesFooter} socialIcons={iconosSociales} withLogo={true} />
    </>
  );
}

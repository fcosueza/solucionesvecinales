import Header from "@/components/layouts/Header";
import CTA from "@/components/ui/CTA";
import Footer from "@/components/layouts/Footer";
import CardFeatures from "@/components/ui/Cards/CardFeatures";
import Gallery from "@/components/layouts/Gallery";
import ContactForm from "@/components/layouts/Forms/ContactForm";
import Image from "next/image";
import { NavItem } from "@/types";
import { SocialIcon } from "@/types";
import style from "./style.module.css";

const tituloHero = "¡Tu comunidad, más conectada y organizada que nunca!";
const parraHero = `Con nuestra app, gestiona incidencias, recibe avisos importantes, reserva espacios comunes y
  consulta las novedades de tu comunidad, desde cualquier lugar y en cualquier momento.`;

const enlacesCabecera: NavItem[] = [
  { text: "Inicio", href: "#" },
  { text: "Características", href: "#gallery" },
  { text: "Contacto", href: "#contact" }
];

const enlacesFooter: NavItem[] = [
  { text: "Inicio", href: "#" },
  { text: "Política de Cookies", href: "/cookie-policy" },
  { text: "Política de Privacidad", href: "/privacy-policy" }
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
    iconURL: "/assets/icons/feature-tablon-50.png",
    iconAltText: "Icono de una notificación",
    title: "Tablón de Anuncios",
    para: "Mantente informado de todo lo que sucede en tu comunidad."
  },
  {
    iconURL: "/assets/icons/feature-incidencia-50.png",
    iconAltText: "Icono de un signo de exclamación",
    title: "Gestión de Incidencias",
    para: "Crea y gestiona incidencias de forma rápida y eficiente."
  },
  {
    iconURL: "/assets/icons/feature-comunes-50.png",
    iconAltText: "Icono de una portería de futbol y un portero",
    title: "Espacios Comunes",
    para: "Reserva los espacios comunes de tu comunidad fácilmente."
  },
  {
    iconURL: "/assets/icons/feature-financial-50.png",
    iconAltText: "Icono de una mujer y un diagrama de barras.",
    title: "Consulta las finanzas",
    para: "Consulta las finanzas de tu comunidad de forma clara."
  }
];

/**
 * Página de inicio pública de la plataforma.
 * Presenta la propuesta de valor, características principales y botones de llamada a la acción
 * para el registro de nuevos usuarios y vista de comunidades.
 *
 * @returns La página de inicio renderizada
 */
export default function Home() {
  return (
    <>
      <Header links={enlacesCabecera} buttonText="Iniciar sesión" buttonRoute="/login" backgroundVariant="highlight" />

      <main className={style.main}>
        <section className={`${style.section} ${style.hero}`}>
          <div className={`${style.container} ${style.hero__content}`}>
            <div className={style.hero__copy}>
              <CTA
                title={tituloHero}
                highlightText="conectada y organizada"
                para={parraHero}
                buttonText="Regístrate ahora"
                buttonRoute={"/signup"}
              />
              <ul className={style.hero__benefits} aria-label="Ventajas principales">
                <li className={style.hero__benefitItem}>
                  <Image
                    src="/assets/icons/check-icon-60.png"
                    alt="Icono de verificación"
                    width={20}
                    height={20}
                    className={style.hero__benefitIcon}
                  />
                  <span>fácil de usar</span>
                </li>
                <li className={style.hero__benefitItem}>
                  <Image
                    src="/assets/icons/shield-icon-64.png"
                    alt="Icono de escudo"
                    width={20}
                    height={20}
                    className={style.hero__benefitIcon}
                  />
                  <span>seguro y privado</span>
                </li>
                <li className={style.hero__benefitItem}>
                  <Image
                    src="/assets/icons/phone-icon-64.png"
                    alt="Icono de teléfono"
                    width={20}
                    height={20}
                    className={style.hero__benefitIcon}
                  />
                  <span>Siempre contigo</span>
                </li>
              </ul>
            </div>
            <Image
              src="/assets/images/hero.svg"
              alt="Imagen de la pantalla de un monitor"
              className={style.hero__image}
              width={699}
              height={618}
              loading="eager"
            />
          </div>
        </section>

        <section id="gallery" className={style.section}>
          <div className={style.container}>
            <div className={style.motivation}>
              <h2 className={style.motivation__title}>
                Todo lo que <span className={style.highlight}>tu comunidad</span> necesita en un solo lugar
              </h2>
            </div>

            <Gallery>
              {datosTarjetas.map(data => {
                return (
                  <CardFeatures
                    iconURL={data.iconURL}
                    iconAltText={data.iconAltText}
                    iconWidth={50}
                    iconHeight={50}
                    cardTitle={data.title}
                    cardPara={data.para}
                    key={data.iconURL}
                  />
                );
              })}
            </Gallery>
          </div>
        </section>

        <section className={style.section} id="contact">
          <div className={`${style.container} ${style.contact__container}`}>
            <div className={style.contact__text}>
              <h3 className={style.contact__title}>Contacta con nosotros</h3>
              <p className={style.contact__para}>
                Si tienes alguna duda, sugerencia o simplemente quieres saludarnos, no dudes en ponerte en contacto con
                nosotros.
              </p>
              <Image
                src="/assets/images/contact.svg"
                width={500}
                height={300}
                alt="Hombre mandando un correo"
                className={style.contact__image}
              />
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer links={enlacesFooter} socialIcons={iconosSociales} withLogo={true} />
    </>
  );
}

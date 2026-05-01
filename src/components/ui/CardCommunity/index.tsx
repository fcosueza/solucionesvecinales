import Image from "next/image";
import style from "./style.module.css";

interface Props {
  imageURL: string;
  imageAltText: string;
  communityName: string;
  communityAddress: string;
  ctaText?: string;
  className?: string;
  ctaDisabled?: boolean;
  ctaButtonType?: "button" | "submit";
  ctaFormID?: string;
}

/**
 * Componente que representa una tarjeta de comunidad, mostrando su imagen, nombre,
 * dirección y una llamada a la acción (CTA) como botón HTML.
 *
 * @param imageURL La URL de la imagen que representa a la comunidad.
 * @param imageAltText El texto alternativo para la imagen, utilizado para accesibilidad.
 * @param communityName El nombre de la comunidad que se mostrará en la tarjeta.
 * @param communityAddress La dirección de la comunidad que se mostrará en la tarjeta.
 * @param ctaText El texto que se mostrará en el botón de llamada a la acción (CTA). Por defecto es "Ver Comunidad".
 * @param className Clases CSS adicionales que se pueden aplicar al componente para personalización.
 * @param ctaDisabled Un booleano que indica si el botón de CTA debe estar deshabilitado. Por defecto es false.
 * @param ctaButtonType El tipo del botón de CTA, puede ser "button" o "submit". Por defecto es "button".
 * @param ctaFormID El ID del formulario al que el botón de CTA debe estar asociado.
 *
 * @returns Un componente React que muestra una tarjeta con la información de la comunidad.
 */
const CardCommunity = ({
  imageURL,
  imageAltText,
  communityName,
  communityAddress,
  ctaText = "Ver Comunidad",
  className = "",
  ctaDisabled = false,
  ctaButtonType = "button",
  ctaFormID
}: Props): React.ReactNode => {
  return (
    <article role="card" className={`${style.card} ${className}`.trim()}>
      <Image className={style.image} src={imageURL} alt={imageAltText} width={480} height={280} />
      <div className={style.content}>
        <h3 className={style.title}>{communityName}</h3>
        <p className={style.address}>{communityAddress}</p>
      </div>

      <button type={ctaButtonType} form={ctaFormID} className={style.cta} disabled={ctaDisabled}>
        {ctaText}
      </button>
    </article>
  );
};

export default CardCommunity;

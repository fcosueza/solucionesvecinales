import Image from "next/image";
import style from "./style.module.css";
import React from "react";

/** Props del componente Card. */
interface Props {
  imageURL: string;
  imageAltText: string;
  imageWidth?: number;
  imageHeight?: number;
  cardTitle: string;
  cardPara: string;
  className?: string;
}

/**
 * Componente que crea una tarjeta con imagen, título y párrafo descriptivo.
 *
 * @param props - Props del componente Card.
 * @param props.imageURL - URL de la imagen de la tarjeta.
 * @param props.imageAltText - Texto alternativo de la imagen.
 * @param props.imageWidth - Ancho de la imagen en píxeles.
 * @param props.imageHeight - Alto de la imagen en píxeles.
 * @param props.cardTitle - Título principal de la tarjeta.
 * @param props.cardPara - Párrafo descriptivo de la tarjeta.
 * @param props.className - Clase CSS opcional para modifcar la apariencia del componente.
 * 
 * @returns La tarjeta con imagen, título y párrafo como un elemento React.
 */
const Card = ({
  imageURL,
  imageAltText,
  imageWidth = 100,
  imageHeight = 100,
  cardTitle,
  cardPara,
  className = ""
}: Props): React.ReactNode => {
  return (
    <div role="card" className={`${style.card} ${className}`.trim()}>
      <Image className={style.img} src={imageURL} alt={imageAltText} width={imageWidth} height={imageHeight} />
      <h3 className={style.title}>{cardTitle}</h3>
      <p className={style.para}>{cardPara}</p>
    </div>
  );
};

export default Card;

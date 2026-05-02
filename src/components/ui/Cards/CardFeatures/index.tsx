import Image from "next/image";
import style from "./style.module.css";
import React from "react";

/** Props del componente CardFeatures. */
interface Props {
  iconURL: string;
  iconAltText: string;
  iconWidth?: number;
  iconHeight?: number;
  cardTitle: string;
  cardPara: string;
  className?: string;
}

/**
 * Componente que crea una tarjeta de características con icono, título y párrafo.
 *
 * @param props - Props del componente CardFeatures.
 * @param props.iconURL - URL del icono de la tarjeta.
 * @param props.iconAltText - Texto alternativo del icono.
 * @param props.iconWidth - Ancho del icono en píxeles.
 * @param props.iconHeight - Alto del icono en píxeles.
 * @param props.cardTitle - Título principal de la tarjeta.
 * @param props.cardPara - Párrafo descriptivo de la tarjeta.
 * @param props.className - Clase CSS opcional para modifcar la apariencia del componente.
 *
 * @returns La tarjeta con icono, título y párrafo como un elemento React.
 */
const CardFeatures = ({
  iconURL,
  iconAltText,
  iconWidth = 56,
  iconHeight = 56,
  cardTitle,
  cardPara,
  className = ""
}: Props): React.ReactNode => {
  return (
    <div role="card" className={`${style.card} ${className}`.trim()}>
      <Image className={style.icon} src={iconURL} alt={iconAltText} width={iconWidth} height={iconHeight} />
      <h3 className={style.title}>{cardTitle}</h3>
      <p className={style.para}>{cardPara}</p>
    </div>
  );
};

export default CardFeatures;

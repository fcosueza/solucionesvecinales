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
 * Component that creates a feature card with icon, title, and paragraph.
 *
 * @param props - Props del componente CardFeatures.
 * @param props.iconURL - URL del icono de la tarjeta.
 * @param props.iconAltText - Texto alternativo del icono.
 * @param props.iconWidth - Width of the icon in pixels.
 * @param props.iconHeight - Height of the icon in pixels.
 * @param props.cardTitle - Main title of the card.
 * @param props.cardPara - Descriptive paragraph of the card.
 * @param props.className - Optional CSS class to modify the appearance of the component.
 *
 * @returns La card with icon, title and paragraph as a React element.
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

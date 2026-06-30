import Image from "next/image";
import style from "./style.module.css";
import React from "react";

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
 * @param iconURL - URL of the card icon.
 * @param iconAltText - Alternative text for the icon.
 * @param iconWidth - Width of the icon in pixels.
 * @param iconHeight - Height of the icon in pixels.
 * @param cardTitle - Main title of the card.
 * @param cardPara - Descriptive paragraph of the card.
 * @param className - Optional CSS class to modify the appearance of the component.
 *
 * @returns The card with icon, title, and paragraph as a React element.
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

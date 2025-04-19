import Image from "next/image";
import style from "./style.module.css";

interface Props {
  imageURL: string;
  imageAltText: string;
  imageWidth?: number;
  imageHeight?: number;
  cardTitle: string;
  cardPara: string;
}

/**
 * Componente Card
 *
 * Componente que crea un elemento de tipo "Tarjeta", representado por una imagen, un titulo debajo
 * de esta y un párrafo.
 *
 * @param imageURL Cadena con la URL de la imagen que se empleará.
 * @param imageAltText Cadena con el texto alternativo que se mostrará si no se puede mostrar la imagen.
 * @param imageWidth Número de pixels que tiene de ancho la imagen. Por defecto 100px.
 * @param imageHeight Número de pixels que tiene de alto la imagen. Por defecto 100px
 * @param cardTitle Cadena con el título de la tarjeta.
 * @param cardPara Cadena con el párrafo de la tarjeta.
 *
 * @returns Node de React consistente en una div con los diferentes elementos de la tarjeta dentro.
 */

const Card = ({
  imageURL,
  imageAltText,
  imageWidth = 100,
  imageHeight = 100,
  cardTitle,
  cardPara
}: Props) => {
  return (
    <div role="card" className={style.card}>
      <Image src={imageURL} alt={imageAltText} width={imageWidth} height={imageHeight} />
      <h3 className={style.title}>{cardTitle}</h3>
      <p className={style.para}>{cardPara}</p>
    </div>
  );
};

export default Card;

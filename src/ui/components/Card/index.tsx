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
      <Image
        className={style.img}
        src={imageURL}
        alt={imageAltText}
        width={imageWidth}
        height={imageHeight}
      />
      <h3 className={style.title}>{cardTitle}</h3>
      <p className={style.para}>{cardPara}</p>
    </div>
  );
};

export default Card;

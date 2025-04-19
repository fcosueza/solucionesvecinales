import Image from "next/image";

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
    <div role="card">
      <Image src={imageURL} alt={imageAltText} width={imageWidth} height={imageHeight} />
      <h3>{cardTitle}</h3>
      <p>{cardPara}</p>
    </div>
  );
};

export default Card;

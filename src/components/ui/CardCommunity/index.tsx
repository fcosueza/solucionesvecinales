import Image from "next/image";
import style from "./style.module.css";

interface Props {
  imageURL: string;
  imageAltText: string;
  communityName: string;
  communityAddress: string;
  ctaText?: string;
  className?: string;
  ctaAsButton?: boolean;
  ctaDisabled?: boolean;
}

const CardCommunity = ({
  imageURL,
  imageAltText,
  communityName,
  communityAddress,
  ctaText = "Ver Comunidad",
  className = "",
  ctaAsButton = false,
  ctaDisabled = false
}: Props): React.ReactNode => {
  return (
    <article role="card" className={`${style.card} ${className}`.trim()}>
      <Image className={style.image} src={imageURL} alt={imageAltText} width={480} height={280} />

      <div className={style.content}>
        <h3 className={style.title}>{communityName}</h3>
        <p className={style.address}>{communityAddress}</p>
      </div>

      {ctaAsButton ? (
        <button type="button" className={style.cta} disabled={ctaDisabled}>
          {ctaText}
        </button>
      ) : (
        <span className={style.cta}>{ctaText}</span>
      )}
    </article>
  );
};

export default CardCommunity;

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
 * Component that represents a community card, showing its image, name,
 * address and a call to action (CTA) as an HTML button.
 *
 * @param imageURL The URL of the image that represents the community.
 * @param imageAltText The alt text for the image, used for accessibility.
 * @param communityName The name of the community to display on the card.
 * @param communityAddress The community address that will be displayed on the card.
 * @param ctaText The text to display on the call to action (CTA) button. By default it is "View Community".
 * @param className Additional CSS classes that can be applied to the component for customization.
 * @param ctaDisabled A boolean indicating whether the CTA button should be disabled. By default it is false.
 * @param ctaButtonType The type of the CTA button can be "button" or "submit". By default it is "button".
 * @param ctaFormID The ID of the form that the CTA button should be associated with.
 *
 * @returns Un React component that displays a card with community information.
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

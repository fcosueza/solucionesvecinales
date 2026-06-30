"use client";

import Button from "../Button";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

/** Props del componente CTA. */
interface Props {
  title: string;
  highlightText?: string;
  para: string;
  buttonText: string;
  buttonRoute?: string;
}

/**
 * Component that creates a CTA (Call to Action) element with title, paragraph and navigation button.
 *
 * @param title - Main title displayed in the block.
 * @param highlightText - Optional fragment of the title to highlight visually.
 * @param para - Descriptive text of the block.
 * @param buttonText - Action button text.
 * @param buttonRoute - Route to which the button navigates.
 * @param highlightText - Title fragment that will be visually highlighted if found in the title.
 *
 * @returns The CTA block with title, paragraph and button as a React element.
 */
const CTA = ({ title, highlightText, para, buttonText, buttonRoute = "/" }: Props): React.ReactNode => {
  const router = useRouter();
  const hasHighlight = Boolean(highlightText && title.includes(highlightText));

  // Function to render the title with the text highlighted if provided.
  const renderTitle = (): React.ReactNode => {
    if (!hasHighlight || !highlightText) {
      return title;
    }

    const [start, ...rest] = title.split(highlightText);
    const end = rest.join(highlightText);

    return (
      <>
        {start}
        <span className={style.title__highlight}>{highlightText}</span>
        {end}
      </>
    );
  };

  return (
    <div className={style.cta}>
      <h1 className={style.title}>{renderTitle()}</h1>
      <p className={style.para}>{para}</p>
      <Button text={buttonText} type="button" onClick={() => router.push(buttonRoute)} />
    </div>
  );
};

export default CTA;

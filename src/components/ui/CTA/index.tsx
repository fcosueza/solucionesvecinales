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
 * @param props - Props del componente CTA.
 * @param props.title - Main title displayed in the block.
 * @param props.highlightText - Optional fragment of the title to highlight visually.
 * @param props.para - Texto descriptivo del bloque.
 * @param props.buttonText - Action button text.
 * @param props.buttonRoute - Route to which the button navigates.
 * @param props.highlightText - Title fragment that will be visually highlighted if found in the title.
 *
 * @returns El CTA block with title, paragraph and button as a React element.
 */
const CTA = ({ title, highlightText, para, buttonText, buttonRoute = "/" }: Props): React.ReactNode => {
  const enrutador = useRouter();
  const tieneResaltado = Boolean(highlightText && title.includes(highlightText));

  // Function to render the title with the text highlighted if provided.
  const renderTitle = (): React.ReactNode => {
    if (!tieneResaltado || !highlightText) {
      return title;
    }

    const [inicio, ...resto] = title.split(highlightText);
    const fin = resto.join(highlightText);

    return (
      <>
        {inicio}
        <span className={style.title__highlight}>{highlightText}</span>
        {fin}
      </>
    );
  };

  return (
    <div className={style.cta}>
      <h1 className={style.title}>{renderTitle()}</h1>
      <p className={style.para}>{para}</p>
      <Button text={buttonText} type="button" onClick={() => enrutador.push(buttonRoute)} />
    </div>
  );
};

export default CTA;

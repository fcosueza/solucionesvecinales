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
  className?: string;
}

/**
 * Componente que crea un elemento CTA (Call to Action) con título, párrafo y botón de navegación.
 *
 * @param props - Props del componente CTA.
 * @param props.title - Título principal mostrado en el bloque.
 * @param props.highlightText - Fragmento opcional del título para resaltar visualmente.
 * @param props.para - Texto descriptivo del bloque.
 * @param props.buttonText - Texto del botón de acción.
 * @param props.buttonRoute - Ruta a la que navega el botón.
 * @param props.className - Clase CSS opcional para modifcar la apariencia del componente.
 * @param props.highlightText - Fragmento del título que se resaltará visualmente si se encuentra en el título.
 * 
 * @returns El bloque CTA con título, párrafo y botón como un elemento React.
 */
const CTA = ({ title, highlightText, para, buttonText, buttonRoute = "/", className = "" }: Props): React.ReactNode => {
  const enrutador = useRouter();
  const tieneResaltado = Boolean(highlightText && title.includes(highlightText));

  // Función para renderizar el título con el texto resaltado si se proporciona.
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
    <div className={`${style.cta} ${className}`.trim()}>
      <h1 className={style.title}>{renderTitle()}</h1>
      <p className={style.para}>{para}</p>
      <Button text={buttonText} type="button" onClick={() => enrutador.push(buttonRoute)} />
    </div>
  );
};

export default CTA;

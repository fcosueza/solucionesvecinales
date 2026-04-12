"use client";

import Button from "../Button";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

/** Props del componente CTA. */
interface Props {
  title: string;
  para: string;
  buttonText: string;
  buttonRoute?: string;
}

/**
 * Componente que crea un elemento CTA (Call to Action) con título, párrafo y botón de navegación.
 *
 * @param props - Props del componente CTA.
 * @param props.title - Título principal mostrado en el bloque.
 * @param props.para - Texto descriptivo del bloque.
 * @param props.buttonText - Texto del botón de acción.
 * @param props.buttonRoute - Ruta a la que navega el botón.
 */
const CTA = ({ title, para, buttonText, buttonRoute = "/" }: Props): React.ReactNode => {
  const enrutador = useRouter();

  return (
    <div className={style.cta}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.para}>{para}</p>
      <Button text={buttonText} type="button" onClick={() => enrutador.push(buttonRoute)} />
    </div>
  );
};

export default CTA;

"use client";

import Button from "../Button";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

interface Props {
  title: string;
  para: string;
  buttonText: string;
  buttonRoute?: string;
}

/**
 * COmponente CTA
 *
 * Componente que crea un Call To Action, compuesto de un título, un párrafo de texto
 * y un botón.
 *
 * @param title Cadena con el título del CTA.
 * @param para Cadena con el párrafo del CTA.
 * @param buttonText Cadena con el texto que mostrará el botón.
 * @param buttonFunc Función para manejar el evento de click en el botón.
 *
 * @returns No de react con todos los elementos del CTA dentro de un div.
 */

const CTA = ({ title, para, buttonText, buttonRoute = "/" }: Props) => {
  const router = useRouter();

  return (
    <div className={style.cta}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.para}>{para}</p>
      <Button text={buttonText} type="button" onClick={() => router.push(buttonRoute)} />
    </div>
  );
};

export default CTA;

"use client";

import style from "./style.module.css";

interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (Event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

/**
 * Componente Button
 *
 * Componente que crea un botón del tipo especificado y que llama a la función
 * indicada cuando se pulsa en él.
 *
 * @param text Cadena con el texto que va a mostrar el botón.
 * @param type Cadena con el tipo de botón que puede ser: button, submit o reset.
 * @param onClick Función que será llamada cuando se pulse el botón.
 * @param disabled Valor booleano que indica si el botón se muestra habilitado o no.
 *
 * @returns Nodo de React con el botón.
 */

const Button = ({ text, type = "button", onClick, disabled = false }: Props): React.ReactNode => {
  return (
    <button type={type} className={style.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

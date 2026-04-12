"use client";

import style from "./style.module.css";

/** Props del componente Button. */
interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (Event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

/**
 * Componente que crea un botón reutilizable para acciones de usuario.
 *
 * @param props - Props del componente Button.
 * @param props.text - Texto visible dentro del botón.
 * @param props.type - Tipo del botón HTML.
 * @param props.onClick - Callback que se ejecuta al hacer click.
 * @param props.disabled - Estado habilitado o deshabilitado del botón.
 */
const Button = ({ text, type = "button", onClick, disabled = false }: Props): React.ReactNode => {
  return (
    <button type={type} className={style.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

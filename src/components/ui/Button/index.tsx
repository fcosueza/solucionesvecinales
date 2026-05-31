"use client";

import style from "./style.module.css";

/** Props del componente Button. */
interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (Event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "danger" | "secondary";
  className?: string;
}

/**
 * Component that creates a reusable button for user actions.
 *
 * @param props - Props del componente Button.
 * @param props.text - Text visible inside the button.
 * @param props.type - HTML button type.
 * @param props.onClick - Callback that is executed when clicking.
 * @param props.disabled - Enabled or disabled status of the button.
 * @param props.fullWidth - If true, the button will occupy the entire available width.
 * @param props.className - Optional CSS class to modify the appearance of the component.
 *
 * @returns El Reusable button as a React element.
 */
const Button = ({
  text,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  variant = "primary",
  className = ""
}: Props): React.ReactNode => {
  return (
    <button
      type={type}
      className={`${style.button} ${fullWidth ? style.button__fullWidth : ""} ${style[variant]} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

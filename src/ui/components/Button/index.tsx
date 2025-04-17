import style from "./style.module.css";

interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (Event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

const Button = ({ text, type = "button", onClick, disabled = false }: Props): React.ReactNode => {
  return (
    <button type={type} className={style.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

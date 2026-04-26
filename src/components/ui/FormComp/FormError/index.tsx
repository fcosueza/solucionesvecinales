import style from "./style.module.css";

/** Props del componente FormError. */
interface Props {
  message: string | string[];
  className?: string;
}

/**
 * Componente de formulario que muestra un mensaje de error de validación.
 *
 * @param props - Props del componente FormError.
 * @param props.message - Mensaje o lista de mensajes a mostrar.
 *
 * @param props.className - Clase CSS opcional para modifcar la apariencia del componente.
 * @returns El mensaje de error de validación del formulario como un elemento React.
 */
const FormError = ({ message, className = "" }: Props): React.ReactNode => (
  <p role="alert" aria-live="assertive" className={`${style.errorMsg} ${className}`.trim()}>
    {"* " + message.toString()}
  </p>
);

export default FormError;

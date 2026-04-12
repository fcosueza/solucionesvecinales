import style from "./style.module.css";

/** Props del componente FormError. */
interface Props {
  message: string | string[];
}

/**
 * Muestra un mensaje de error de validación para campos de formulario.
 *
 * @param props - Props del componente FormError.
 * @param props.message - Mensaje o lista de mensajes a mostrar.
 */
const FormError = ({ message }: Props): React.ReactNode => (
  <p role="alert" aria-live="assertive" className={style.errorMsg}>
    {"* " + message.toString()}
  </p>
);

export default FormError;

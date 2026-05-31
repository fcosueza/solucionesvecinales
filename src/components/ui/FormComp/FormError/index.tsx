import style from "./style.module.css";

/** Props del componente FormError. */
interface Props {
  message: string | string[];
}

/**
 * Form component that displays a validation error message.
 *
 * @param props - Props del componente FormError.
 * @param props.message - Message or list of messages to display.
 *
 * @returns The form validation error message as a React element.
 */
const FormError = ({ message }: Props): React.ReactNode => (
  <p role="alert" aria-live="assertive" className={style.errorMsg}>
    {"* " + message.toString()}
  </p>
);

export default FormError;

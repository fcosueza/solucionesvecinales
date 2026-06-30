import style from "./style.module.css";
interface Props {
  message: string | string[];
}

/**
 * Form component that displays a validation error message.
 *
 * @param message - Message or list of messages to display.
 *
 * @returns The form validation error message as a React element.
 */
const FormError = ({ message }: Props): React.ReactNode => (
  <p role="alert" aria-live="assertive" className={style.errorMsg}>
    {"* " + message.toString()}
  </p>
);

export default FormError;

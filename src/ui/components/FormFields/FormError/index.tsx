import style from "./style.module.css";

interface Props {
  message: string | string[];
}

const FormError = ({ message }: Props): React.ReactNode => (
  <p role="alert" aria-live="assertive" className={style.errorMsg}>
    {"* " + message.toString()}
  </p>
);

export default FormError;

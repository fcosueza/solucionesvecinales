import style from "./style.module.css";

interface Props {
  message: string;
}

const FormError = ({ message }: Props): React.ReactNode => (
  <p role="alert" aria-live="assertive" className={style.errorMsg}>
    {"* " + message}
  </p>
);

export default FormError;

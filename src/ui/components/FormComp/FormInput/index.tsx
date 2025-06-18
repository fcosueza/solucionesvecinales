import { FormInputAttrs, InputType } from "@/types";
import FormError from "../FormError";
import style from "./style.module.css";

interface Props {
  labelText: string;
  attr: FormInputAttrs;
  rows?: number;
  errorMsg?: string | string[];
}

const FormInput = ({ labelText, attr, rows = 5, errorMsg = "" }: Props): React.ReactNode => {
  const className = `${style.control__input} ${errorMsg ? style.control__inputError : ""}`;
  const ariaLabel = `${attr.id}-input`;

  return (
    <div role="form-control" className={style.control}>
      <label className={style.control__label} htmlFor={attr.id}>
        {labelText}
      </label>
      {attr.type != InputType.textarea ? (
        <input className={className} aria-label={ariaLabel} {...attr} />
      ) : (
        <textarea className={className} rows={rows} aria-label={ariaLabel} {...attr} />
      )}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default FormInput;

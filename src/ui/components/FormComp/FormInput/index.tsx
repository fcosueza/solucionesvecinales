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

  return (
    <div role="form-control" className={style.control}>
      <label className={style.control__label} htmlFor={attr.id}>
        {labelText}
      </label>
      {attr.type != InputType.textarea ? (
        <input className={className} {...attr} />
      ) : (
        <textarea className={className} {...attr} rows={rows} />
      )}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default FormInput;

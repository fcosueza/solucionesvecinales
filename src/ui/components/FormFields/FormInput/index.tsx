import { FormFieldAttrs } from "@/types";
import { InputType } from "@/types";
import FormError from "../FormError";
import style from "./style.module.css";

interface Props extends FormFieldAttrs {
  pattern?: string | undefined;
  rowSize?: number;
  errorMsg?: string;
}

const FormInput = ({ rowSize, pattern, errorMsg, labelText, ...rest }: Props): React.ReactNode => {
  const classes = errorMsg ? style.inputError : style.input;

  return (
    <div className={style.control} role="group">
      <label className={style.label} htmlFor={rest.id}>
        {labelText}
      </label>
      {rest.type == InputType.textarea ? (
        <textarea className={classes} {...rest} rows={rowSize}></textarea>
      ) : (
        <input className={classes} {...rest} pattern={pattern}></input>
      )}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default FormInput;

import { FormFieldAttrs } from "@/types";
import { InputType } from "@/types";
import FormError from "../../FormError";
import style from "./style.module.css";

interface Props extends FormFieldAttrs {
  type: InputType;
  pattern?: string | undefined;
  rowSize?: number;
}

const FormInput = ({
  type,
  pattern,
  rowSize,
  labelText,
  errorMsg,
  ...rest
}: Props): React.ReactNode => {
  const inputClasses = errorMsg ? style.inputError : style.input;

  return (
    <div className={style.control} role="group">
      <label className={style.label} htmlFor={rest.id}>
        {labelText}
      </label>
      {type == InputType.textarea ? (
        <textarea className={inputClasses} {...rest} rows={rowSize}></textarea>
      ) : (
        <input className={inputClasses} {...rest} pattern={pattern}></input>
      )}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default FormInput;

import { InputType } from "@/types";
import FormError from "../FormError";

interface Props {
  id: string;
  name: string;
  type: InputType;
  labelText: string;
  placeHolder: string;
  required: boolean;
  value?: string | number | undefined;
  pattern?: string | undefined;
  textAreaRows?: number | undefined;
  errorMsg?: string;
}

const InputControl = ({
  pattern,
  textAreaRows,
  errorMsg,
  labelText,
  ...rest
}: Props): React.ReactNode => {
  const inputElement: React.ReactNode =
    rest.type == InputType.textarea ? (
      <textarea {...rest} rows={textAreaRows}></textarea>
    ) : (
      <input {...rest} pattern={pattern}></input>
    );

  return (
    <div>
      <label htmlFor={rest.id}>{labelText}</label>
      {inputElement}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default InputControl;

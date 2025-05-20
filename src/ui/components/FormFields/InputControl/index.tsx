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
  ...commonAttr
}: Props): React.ReactNode => {
  const inputElement: React.ReactNode =
    commonAttr.type == InputType.textarea ? (
      <textarea {...commonAttr} rows={textAreaRows}></textarea>
    ) : (
      <input {...commonAttr} pattern={pattern}></input>
    );

  return (
    <div>
      <label htmlFor={commonAttr.id}>{commonAttr.labelText}</label>
      {inputElement}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default InputControl;

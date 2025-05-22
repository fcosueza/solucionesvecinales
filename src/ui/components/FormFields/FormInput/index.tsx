import { InputType } from "@/types";
import FormError from "../FormError";

interface Props {
  id: string;
  name: string;
  type: InputType;
  labelText: string;
  placeHolder: string;
  value?: string | number | undefined;
  required?: boolean;
  pattern?: string | undefined;
  errorMsg?: string;
}

const FormInput = ({ pattern, errorMsg, labelText, ...rest }: Props): React.ReactNode => {
  return (
    <div>
      <label htmlFor={rest.id}>{labelText}</label>
      <input {...rest} pattern={pattern}></input>
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default FormInput;

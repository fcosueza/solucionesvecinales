import { FormFieldAttrs, InputType } from "@/types";

interface Props {
  labelText: string;
  attr: FormFieldAttrs;
  type: InputType;
  rows?: number;
  errorMsg?: string;
}

const FormInput = ({ labelText, attr, type, rows = 5, errorMsg }: Props): React.ReactNode => {
  return (
    <div>
      <label htmlFor="">{labelText}</label>
      <input type="text" />
    </div>
  );
};

export default FormInput;

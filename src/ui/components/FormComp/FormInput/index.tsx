import { FormFieldAttrs } from "@/types";

interface Props {
  labelText: string;
  attr: FormFieldAttrs;
  rows?: number;
  errorMsg?: string;
}

const FormInput = ({ labelText, attr, rows = 5, errorMsg }: Props): React.ReactNode => {
  return (
    <div>
      <label htmlFor=""></label>
      <input type="text" />
    </div>
  );
};

export default FormInput;

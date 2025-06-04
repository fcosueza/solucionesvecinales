import { FormFieldAttrs } from "@/types";

interface Props {
  labelText: string;
  attr: FormFieldAttrs;
}

const FormInput = ({ labelText, attr }) => {
  return (
    <div>
      <label htmlFor=""></label>
      <input type="text" />
    </div>
  );
};

export default FormInput;

import { FormInputAttrs, InputType } from "@/types";
import FormError from "../FormError";

interface Props {
  labelText: string;
  attr: FormInputAttrs;
  rows?: number;
  errorMsg?: string;
}

const FormInput = ({ labelText, attr, rows = 5, errorMsg = "" }: Props): React.ReactNode => {
  const inputAttr = {
    id: attr.id,
    name: attr.name || attr.id,
    type: attr.type,
    defaultValue: attr.defaultValue,
    required: attr.required || false
  };

  return (
    <div>
      <label htmlFor={attr.id}>{labelText}</label>
      {attr.type != InputType.textarea ? (
        <input {...inputAttr} />
      ) : (
        <textarea {...inputAttr} rows={rows} />
      )}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default FormInput;

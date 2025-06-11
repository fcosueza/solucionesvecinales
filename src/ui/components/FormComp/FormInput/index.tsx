import { FormFieldAttrs, InputType } from "@/types";

interface Props {
  labelText: string;
  attr: FormFieldAttrs;
  type: InputType;
  rows?: number;
  errorMsg?: string;
}

const FormInput = ({ labelText, attr, type, rows = 5, errorMsg }: Props): React.ReactNode => {
  const inputAttr = {
    id: attr.id,
    name: attr.name || attr.id,
    type: type,
    value: attr.value,
    required: attr.required || false
  };

  return (
    <div>
      <label htmlFor={attr.id}>{labelText}</label>
      {type != InputType.textarea ? (
        <input {...inputAttr} />
      ) : (
        <textarea {...inputAttr} rows={rows} />
      )}
    </div>
  );
};

export default FormInput;

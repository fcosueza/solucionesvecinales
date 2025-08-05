import { FormRadioAttrs, RadioBoxType } from "@/types";
import style from "./style.module.css";
import FormError from "../FormError";

interface Props {
  legend: string;
  type: RadioBoxType;
  elementList: { labelText: string; radioAttr: FormRadioAttrs }[];
  errorMsg?: string | string[];
}

// TODO: Implement checkbox type generation.

const FormRadioBox = ({ legend, type, elementList, errorMsg = "" }: Props): React.ReactNode => {
  if (type == RadioBoxType.checkbox) return <h1>checkbox not implemented yet!!</h1>;

  const items: React.ReactNode = elementList.map(element => (
    <div className={style.radioCont} key={`${element.radioAttr.id}`}>
      <input
        type={type}
        className={style.radio}
        aria-label={`${element.radioAttr.id}-${type}`}
        {...element.radioAttr}
      />
      <label htmlFor={element.radioAttr.id}>{element.labelText}</label>
    </div>
  ));

  return (
    <div className={style.control} role="form-control">
      <fieldset className={style.fieldset}>
        <legend className={style.legend}>{legend}</legend>
        {items}
        {errorMsg ? <FormError message={errorMsg} /> : ""}
      </fieldset>
    </div>
  );
};

export default FormRadioBox;

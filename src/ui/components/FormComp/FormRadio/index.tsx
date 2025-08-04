import { FormRadioAttrs, RadioType } from "@/types";
import style from "./style.module.css";
import FormError from "../FormError";

interface Props {
  legend: string;
  type: RadioType;
  elementList: { labelText: string; radioAttr: FormRadioAttrs }[];
  errorMsg?: string | string[];
}

// TODO: Implement checkbox type generation.

const FormRadio = ({ legend, type, elementList, errorMsg = "" }: Props): React.ReactNode => {
  if (type == RadioType.checkbox) return <h1>checkbox not implemented yet!!</h1>;

  const items: React.ReactNode = elementList.map(element => (
    <div className={style.radioCont} key={`${element.radioAttr.id}`}>
      <input
        type={type}
        className={style.radio}
        aria-label={`${element.radioAttr.id}-${type}`}
        {...element.radioAttr}
      />
      <label htmlFor="tenant">inquilino</label>
    </div>
  ));

  return (
    <div className={style.control}>
      <fieldset className={style.fieldset} role="radiogroup">
        <legend className={style.legend}>{legend}</legend>
        {items}
        {errorMsg ? <FormError message={errorMsg} /> : ""}
      </fieldset>
    </div>
  );
};

export default FormRadio;

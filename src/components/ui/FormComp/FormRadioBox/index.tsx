import { FormRadioAttrs, RadioBoxType } from "@/types";
import style from "./style.module.css";
import FormError from "../FormError";

/** Props del componente FormRadioBox. */
interface Props {
  legend: string;
  type: RadioBoxType;
  name: string;
  elementList: { labelText: string; radioAttr: FormRadioAttrs }[];
  errorMsg?: string | string[];
}

/** TODO: Implement checkbox type generation. */

/**
 * Form component that renders grouped radio controls with optional validation feedback.
 *
 * @param props - Props del componente FormRadioBox.
 * @param props.legend - Texto de la leyenda del grupo de opciones.
 * @param props.type - Tipo de control a renderizar (radio o checkbox).
 * @param props.name - Name shared by group entries.
 * @param props.elementList - List of options with label and input attributes.
 * @param props.errorMsg - Optional error message for the group.
 *
 * @returns El group of radio controls with validation feedback as a React element.
 */
const FormRadioBox = ({ legend, type, name, elementList, errorMsg = "" }: Props): React.ReactNode => {
  if (type == RadioBoxType.checkbox) return <h1>checkbox not implemented yet!!</h1>;

  // The list of options to generate the radio controls with their associated labels is mapped.
  const elementosRadio: React.ReactNode = elementList.map(elemento => (
    <div className={style.controlRadio} key={`${elemento.radioAttr.id}`}>
      <input
        type={type}
        className={style.radio}
        name={name}
        aria-label={`${elemento.radioAttr.id}-${type}`}
        {...elemento.radioAttr}
      />
      <label htmlFor={elemento.radioAttr.id}>{elemento.labelText}</label>
    </div>
  ));

  return (
    <div className={style.control} role="form-control">
      <fieldset className={style.fieldset}>
        <legend className={style.legend}>{legend}</legend>
        {elementosRadio}
        {errorMsg ? <FormError message={errorMsg} /> : ""}
      </fieldset>
    </div>
  );
};

export default FormRadioBox;

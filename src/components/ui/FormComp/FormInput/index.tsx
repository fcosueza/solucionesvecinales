import { FormInputAttrs, InputType } from "@/types";
import FormError from "../FormError";
import style from "./style.module.css";

/** Props del componente FormInput. */
interface Props {
  labelText: string;
  attr: FormInputAttrs;
  rows?: number;
  errorMsg?: string | string[];
}

/**
 * Form component that renders an input or textarea with optional error status.
 *
 * @param props - Props del componente FormInput.
 * @param props.labelText - Texto visible asociado a la etiqueta del campo.
 * @param props.attr - HTML attributes and field configuration.
 * @param props.rows - Cantidad de filas cuando se renderiza un textarea.
 * @param props.errorMsg - Optional error message for validation.
 *
 * @returns The form field with label and error status as a React element.
 */
const FormInput = ({ labelText, attr, rows = 5, errorMsg = "" }: Props): React.ReactNode => {
  const clasesInput = `${style.control__input} ${errorMsg ? style.control__inputError : ""}`;
  const etiquetaAria = `${attr.id}-input`;

  return (
    <div role="form-control" className={style.control}>
      <label className={style.control__label} htmlFor={attr.id}>
        {labelText}
        {attr.required ? (
          <span className={style.control__required} title="Requerido">
            {" "}
            *
          </span>
        ) : (
          ""
        )}
      </label>
      {attr.type != InputType.textarea ? (
        <input className={clasesInput} aria-label={etiquetaAria} {...attr} />
      ) : (
        <textarea className={clasesInput} rows={rows} aria-label={etiquetaAria} {...attr} />
      )}
      {errorMsg ? <FormError message={errorMsg} /> : ""}
    </div>
  );
};

export default FormInput;

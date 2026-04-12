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
 * Componente de formulario que renderiza un input o textarea con estado de error opcional.
 *
 * @param props - Props del componente FormInput.
 * @param props.labelText - Texto visible asociado a la etiqueta del campo.
 * @param props.attr - Atributos HTML y configuración del campo.
 * @param props.rows - Cantidad de filas cuando se renderiza un textarea.
 * @param props.errorMsg - Mensaje de error opcional para validación.
 *
 * @returns El campo de formulario con etiqueta y estado de error como un elemento React.
 */
const FormInput = ({ labelText, attr, rows = 5, errorMsg = "" }: Props): React.ReactNode => {
  const clasesInput = `${style.control__input} ${errorMsg ? style.control__inputError : ""}`;
  const etiquetaAria = `${attr.id}-input`;

  return (
    <div role="form-control" className={style.control}>
      <label className={style.control__label} htmlFor={attr.id}>
        {labelText}
        {attr.required ? <span title="Requerido"> *</span> : ""}
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

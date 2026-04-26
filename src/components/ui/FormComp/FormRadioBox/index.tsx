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
  className?: string;
}

/** TODO: Implementar la generación de tipo checkbox. */

/**
 * Componente de formulario que renderiza controles de radio agrupados con feedback de validación opcional.
 *
 * @param props - Props del componente FormRadioBox.
 * @param props.legend - Texto de la leyenda del grupo de opciones.
 * @param props.type - Tipo de control a renderizar (radio o checkbox).
 * @param props.name - Nombre compartido por los inputs del grupo.
 * @param props.elementList - Lista de opciones con etiqueta y atributos del input.
 * @param props.errorMsg - Mensaje de error opcional para el grupo.
 *
 * @param props.className - Clase CSS opcional para modifcar la apariencia del componente.
 * @returns El grupo de controles de radio con feedback de validación como un elemento React.
 */
const FormRadioBox = ({
  legend,
  type,
  name,
  elementList,
  errorMsg = "",
  className = ""
}: Props): React.ReactNode => {
  if (type == RadioBoxType.checkbox) return <h1>checkbox not implemented yet!!</h1>;

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
    <div className={`${style.control} ${className}`.trim()} role="form-control">
      <fieldset className={style.fieldset}>
        <legend className={style.legend}>{legend}</legend>
        {elementosRadio}
        {errorMsg ? <FormError message={errorMsg} /> : ""}
      </fieldset>
    </div>
  );
};

export default FormRadioBox;

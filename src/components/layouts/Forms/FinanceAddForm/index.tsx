"use client";

import { communityFinance } from "@/actions/community/communityFinance";
import { useRef, useState } from "react";
import style from "./style.module.css";

interface Props {
  communityID: number;
  onClose: () => void;
}

/**
 * Formulario modal para añadir un registro financiero (ingreso o gasto) a una comunidad.
 * Permite introducir descripción, importe y tipo (ingreso/gasto).
 *
 * @param communityID ID de la comunidad a la que se añade el registro financiero
 * @param onClose Función de cierre del modal
 */
const FinanceAddForm = ({ communityID, onClose }: Props): React.ReactNode => {
  const [pending, setPending] = useState(false);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const handleAdd = async (formData: FormData) => {
    setPending(true);
    await communityFinance(communityID, formData);
    setPending(false);

    if (descriptionRef.current) {
      descriptionRef.current.value = "";
    }

    if (amountRef.current) {
      amountRef.current.value = "";
    }

    if (typeRef.current) {
      typeRef.current.value = "gasto";
    }

    onClose();
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.popup} onClick={event => event.stopPropagation()}>
        <h3 className={style.popupTitle}>Nuevo registro</h3>

        <form action={handleAdd}>
          <input
            ref={descriptionRef}
            type="text"
            name="descripcion"
            className={style.popupInput}
            placeholder="Descripcion del registro"
            maxLength={100}
            required
          />

          <input
            ref={amountRef}
            type="number"
            name="importe"
            className={style.popupInput}
            placeholder="Importe"
            min="0.01"
            step="0.01"
            required
          />

          <select ref={typeRef} name="tipo" className={style.popupSelect} defaultValue="gasto">
            <option value="gasto">Pago</option>
            <option value="ingreso">Ingreso</option>
          </select>

          <div className={style.popupActions}>
            <button type="button" className={style.cancelBtn} onClick={onClose} disabled={pending}>
              Cancelar
            </button>
            <button type="submit" className={style.submitBtn} disabled={pending}>
              {pending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceAddForm;

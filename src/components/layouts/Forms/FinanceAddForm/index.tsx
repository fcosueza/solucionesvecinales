"use client";

import { communityFinance } from "@/actions/community/communityFinance";
import { useState } from "react";
import style from "./style.module.css";

interface Props {
  communityID: number;
  onClose: () => void;
}

/**
 * Modal form to add a financial record (income or expense) to a community.
 * Allows you to enter description, amount and type (income/expense).
 *
 * @param communityID ID of the community to which the financial record is added
 * @param onClose Modal close function
 *
 * @returns The form to add a financial record as a React element.
 */
const FinanceAddForm = ({ communityID, onClose }: Props): React.ReactNode => {
  const [pending, setPending] = useState(false);

  const handleAdd = async (formData: FormData) => {
    setPending(true);
    await communityFinance(communityID, formData);
    setPending(false);

    onClose();
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.popup} onClick={event => event.stopPropagation()}>
        <h3 className={style.popupTitle}>Nuevo registro</h3>

        <form action={handleAdd}>
          <input
            type="text"
            name="descripcion"
            className={style.popupInput}
            placeholder="Descripcion del registro"
            maxLength={100}
            required
          />

          <input
            type="number"
            name="importe"
            className={style.popupInput}
            placeholder="Importe"
            min="0.01"
            step="0.01"
            required
          />

          <select name="tipo" className={style.popupSelect} defaultValue="gasto">
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

"use client";

import FinanceAddForm from "@/components/layouts/Forms/FinanceAddForm";
import IncidentAddForm from "@/components/layouts/Forms/IncidentAddForm";
import { useState } from "react";
import style from "./style.module.css";

type ModalType = "finance" | "incident";

interface ActionButtonProps {
  buttonText?: string;
  canOpen?: boolean;
  modalType: ModalType;
  communityID: number;
}

/**
 * Renderiza un botón de acción para secciones de comunidad que abre un formulario modal.
 *
 * @param props Propiedades del botón de acción.
 * @param props.buttonText Texto mostrado en el botón. Si no se proporciona, usa "+ añadir".
 * @param props.canOpen Define si el botón debe renderizarse. Si es false, no se muestra ni permite abrir el modal.
 * @param props.modalType Determina el formulario a abrir: finanzas ("finance") o incidencias ("incident").
 * @param props.communityID Identificador de la comunidad que se envía al formulario abierto.
 * @returns Un nodo React con el botón y, cuando corresponde, el formulario modal abierto.
 */
const ActionButton = ({ buttonText, canOpen = true, modalType, communityID }: ActionButtonProps): React.ReactNode => {
  const [showForm, setShowForm] = useState(false);
  const resolvedButtonText = buttonText ?? "+ añadir";

  return (
    <>
      {canOpen && (
        <button type="button" className={style.addBtn} onClick={() => setShowForm(true)}>
          {resolvedButtonText}
        </button>
      )}

      {showForm &&
        (modalType === "finance" ? (
          <FinanceAddForm communityID={communityID} onClose={() => setShowForm(false)} />
        ) : (
          <IncidentAddForm communityID={communityID} onClose={() => setShowForm(false)} />
        ))}
    </>
  );
};

export default ActionButton;

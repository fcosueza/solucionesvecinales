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
 * Renders an action button for community sections that opens a modal form.
 *
 * @param props Action button properties.
 * @param props.buttonText Text displayed on the button. If not provided, use "+add".
 * @param props.canOpen Defines whether the button should be rendered. If false, the modal is not displayed or allowed to open.
 * @param props.modalType Determines the form to open: finance ("finance") or incidents ("incident").
 * @param props.communityID Community identifier that is sent to the open form.
 *
 * @returns A React node with the button and, where applicable, the open modal form.
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

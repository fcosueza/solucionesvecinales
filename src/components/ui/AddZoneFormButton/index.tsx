"use client";

import { useState } from "react";
import AddZoneForm from "@/components/layouts/Forms/AddZoneForm";
import style from "@/components/ui/ActionButton/style.module.css";

interface Props {
  communityID: number;
}

/**
 * Botón que muestra u oculta el formulario modal para añadir una nueva zona común.
 *
 * @param communityID ID de la comunidad donde se añadirá la zona
 */
const AddZoneFormButton = ({ communityID }: Props): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" className={style.addBtn} onClick={() => setIsOpen(true)}>
        + añadir zona
      </button>

      {isOpen ? <AddZoneForm communityID={communityID} onClose={() => setIsOpen(false)} /> : null}
    </>
  );
};

export default AddZoneFormButton;

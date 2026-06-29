"use client";

import { useState } from "react";
import AddZoneForm from "@/components/layouts/Forms/AddZoneForm";
import style from "./style.module.css";

interface Props {
  communityID: number;
}

/**
 * Button that shows or hides the modal form to add a new common area.
 *
 * @param communityID ID of the community where the zone will be added
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

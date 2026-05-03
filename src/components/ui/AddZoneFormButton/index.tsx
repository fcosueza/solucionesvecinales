"use client";

import { useState } from "react";
import AddZoneForm from "@/components/layouts/Forms/AddZoneForm";
import style from "@/components/ui/ActionButton/style.module.css";

interface Props {
  communityID: number;
}

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

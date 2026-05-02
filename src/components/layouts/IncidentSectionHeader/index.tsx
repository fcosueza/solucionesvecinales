"use client";

import { useState } from "react";
import IncidentAddForm from "@/components/layouts/Forms/IncidentAddForm";
import style from "./style.module.css";

interface Props {
  communityID: number;
}

const IncidentSectionHeader = ({ communityID }: Props): React.ReactNode => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className={style.row}>
        <h2 className={style.sectionTitle}>Incidencias de la comunidad</h2>
        <button type="button" className={style.addBtn} onClick={() => setShowForm(true)}>
          + añadir incidencias
        </button>
      </div>

      {showForm && <IncidentAddForm communityID={communityID} onClose={() => setShowForm(false)} />}
    </>
  );
};

export default IncidentSectionHeader;

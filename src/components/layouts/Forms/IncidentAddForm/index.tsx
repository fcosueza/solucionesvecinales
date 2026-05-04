"use client";

import { addIncident } from "@/actions/community/communityIncident";
import { useRef, useState } from "react";
import style from "./style.module.css";

interface Props {
  communityID: number;
  onClose: () => void;
}

/**
 * Formulario modal para reportar una nueva incidencia en una comunidad.
 * Permite introducir el título y la descripción de la incidencia.
 *
 * @param communityID ID de la comunidad donde se reporta la incidencia
 * @param onClose Función de cierre del modal
 */
const IncidentAddForm = ({ communityID, onClose }: Props): React.ReactNode => {
  const [pending, setPending] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleAdd = async (formData: FormData) => {
    setPending(true);
    await addIncident(communityID, formData);
    setPending(false);

    if (titleRef.current) {
      titleRef.current.value = "";
    }

    if (descriptionRef.current) {
      descriptionRef.current.value = "";
    }

    onClose();
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.popup} onClick={event => event.stopPropagation()}>
        <h3 className={style.popupTitle}>Nueva incidencia</h3>

        <form action={handleAdd}>
          <input
            ref={titleRef}
            type="text"
            name="titulo"
            className={style.popupInput}
            placeholder="Titulo de la incidencia"
            maxLength={80}
            required
          />

          <textarea
            ref={descriptionRef}
            name="descripcion"
            className={style.popupTextarea}
            placeholder="Describe la incidencia..."
            rows={4}
            maxLength={300}
            required
          />

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

export default IncidentAddForm;

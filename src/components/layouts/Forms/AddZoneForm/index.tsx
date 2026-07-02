"use client";

import { createZone } from "@/actions/community/communityZone";
import { FormActionState } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import style from "./style.module.css";

interface Props {
  communityID: number;
  onClose: () => void;
}

const initialState: FormActionState = {
  state: "error" as const,
  message: ""
};

const MAX_DESCRIPTION = 100;

/**
 * Modal form to create a new common area in a community.
 * Allows you to enter name, description and opening and closing hours.
 *
 * @param communityID ID of the community where the zone is created
 * @param onClose Modal close function
 */
const AddZoneForm = ({ communityID, onClose }: Props): React.ReactNode => {
  const router = useRouter();
  const [descriptionLen, setDescriptionLen] = useState(0);
  const [state, formAction, isPending] = useActionState(
    (_prevState: FormActionState, formData: FormData) => createZone(communityID, formData),
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.state === "success") {
      toast.success(state.message);
      router.refresh();
      onClose();
      return;
    }

    toast.error(state.message);
  }, [state, router, onClose]);

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.popup} onClick={event => event.stopPropagation()}>
        <h3 className={style.popupTitle}>Nueva zona común</h3>

        <form action={formAction}>
          <input
            type="text"
            name="nombre"
            className={style.popupInput}
            placeholder="Nombre de la zona"
            maxLength={100}
            required
          />

          <textarea
            name="descripcion"
            className={style.popupTextarea}
            placeholder="Describe la zona..."
            rows={2}
            maxLength={MAX_DESCRIPTION}
            onChange={e => setDescriptionLen(e.target.value.length)}
            required
          />
          <p className={style.charCount}>
            {descriptionLen} / {MAX_DESCRIPTION}
          </p>

          <input type="time" name="horaInicio" className={style.popupInput} required />

          <input type="time" name="horaFin" className={style.popupInput} required />

          <div className={style.popupActions}>
            <button type="button" className={style.cancelBtn} onClick={onClose} disabled={isPending}>
              Cancelar
            </button>
            <button type="submit" className={style.submitBtn} disabled={isPending}>
              {isPending ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddZoneForm;

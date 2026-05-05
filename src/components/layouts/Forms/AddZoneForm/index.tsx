"use client";

import { createZone } from "@/actions/community/communityZone";
import { FormActionState } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
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

const DESCRIPCION_MAX = 100;

/**
 * Formulario modal para crear una nueva zona común en una comunidad.
 * Permite introducir nombre, descripción y horario de apertura y cierre.
 *
 * @param communityID ID de la comunidad donde se crea la zona
 * @param onClose Función de cierre del modal
 */
const AddZoneForm = ({ communityID, onClose }: Props): React.ReactNode => {
  const router = useRouter();
  const [descripcionLen, setDescripcionLen] = useState(0);
  const [estado, accionFormulario, estaPendiente] = useActionState(
    (_prevState: FormActionState, formData: FormData) => createZone(communityID, formData),
    initialState
  );
  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLTextAreaElement>(null);
  const horaInicioRef = useRef<HTMLInputElement>(null);
  const horaFinRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!estado.message) return;

    if (estado.state === "success") {
      toast.success(estado.message);
      router.refresh();
      onClose();
      return;
    }

    toast.error(estado.message);
  }, [estado, router, onClose]);

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.popup} onClick={event => event.stopPropagation()}>
        <h3 className={style.popupTitle}>Nueva zona común</h3>

        <form action={accionFormulario}>
          <input
            ref={nombreRef}
            type="text"
            name="nombre"
            className={style.popupInput}
            placeholder="Nombre de la zona"
            maxLength={100}
            required
          />

          <textarea
            ref={descripcionRef}
            name="descripcion"
            className={style.popupTextarea}
            placeholder="Describe la zona..."
            rows={2}
            maxLength={DESCRIPCION_MAX}
            onChange={e => setDescripcionLen(e.target.value.length)}
            required
          />
          <p className={style.charCount}>
            {descripcionLen} / {DESCRIPCION_MAX}
          </p>

          <input ref={horaInicioRef} type="time" name="horaInicio" className={style.popupInput} required />

          <input ref={horaFinRef} type="time" name="horaFin" className={style.popupInput} required />

          <div className={style.popupActions}>
            <button type="button" className={style.cancelBtn} onClick={onClose} disabled={estaPendiente}>
              Cancelar
            </button>
            <button type="submit" className={style.submitBtn} disabled={estaPendiente}>
              {estaPendiente ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddZoneForm;

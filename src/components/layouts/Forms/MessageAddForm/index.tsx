"use client";

import { addMessage } from "@/actions/community/communityMessage";
import { useRef, useState } from "react";
import style from "./style.module.css";

interface Props {
  communityID: number;
  onClose: () => void;
}

/**
 * Modal form to post a new message on a community board.
 * Only accessible to community administrators.
 *
 * @param communityID ID of the community to which the board belongs
 * @param onClose Modal close function
 *
 * @returns The form to post a new message as a React element.
 */
const MessageAddForm = ({ communityID, onClose }: Props): React.ReactNode => {
  const [pending, setPending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAdd = async (formData: FormData) => {
    setPending(true);
    await addMessage(communityID, formData);
    setPending(false);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    onClose();
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.popup} onClick={e => e.stopPropagation()}>
        <h3 className={style.popupTitle}>Nuevo mensaje</h3>
        <form action={handleAdd}>
          <textarea
            ref={textareaRef}
            name="texto"
            className={style.popupTextarea}
            placeholder="Escribe el mensaje..."
            rows={4}
            required
          />
          <div className={style.popupActions}>
            <button type="button" className={style.cancelBtn} onClick={onClose} disabled={pending}>
              Cancelar
            </button>
            <button type="submit" className={style.submitBtn} disabled={pending}>
              {pending ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageAddForm;

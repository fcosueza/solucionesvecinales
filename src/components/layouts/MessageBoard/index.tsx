"use client";

import { deleteMessage } from "@/actions/community/communityMessage";
import { useState } from "react";
import MessageAddForm from "@/components/layouts/Forms/MessageAddForm";
import style from "./style.module.css";

interface Message {
  texto: string;
  creadoEn: Date;
}

interface Props {
  mensajes: Message[];
  comunidadId: number;
  isAdmin?: boolean;
}

const formatMessageDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

const MessageBoard = ({ mensajes, comunidadId, isAdmin = false }: Props): React.ReactNode => {
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (creadoEn: Date) => {
    await deleteMessage(comunidadId, creadoEn);
  };

  return (
    <div className={style.wrapper}>
      {mensajes.length === 0 ? (
        <div className={style.boardEmpty}>
          <p className={style.emptyTitle}>No hay mensajes publicados.</p>
          <p className={style.emptyDescription}>Cuando se creen avisos para esta comunidad, apareceran aqui.</p>
          {isAdmin && (
            <button type="button" className={style.addBtn} onClick={() => setShowForm(true)}>
              + Añadir mensaje
            </button>
          )}
        </div>
      ) : (
        <div className={style.board}>
          <ul className={style.messageList}>
            {mensajes.map(mensaje => (
              <li key={`${mensaje.creadoEn.toISOString()}-${mensaje.texto}`} className={style.messageItem}>
                <div className={style.messageContent}>
                  <p className={style.messageText}>{mensaje.texto}</p>
                  <p className={style.messageDate}>{formatMessageDate(mensaje.creadoEn)}</p>
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    className={style.deleteBtn}
                    aria-label="Eliminar mensaje"
                    onClick={() => handleDelete(mensaje.creadoEn)}
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
          {isAdmin && (
            <button type="button" className={style.addBtn} onClick={() => setShowForm(true)}>
              + Añadir mensaje
            </button>
          )}
        </div>
      )}

      {isAdmin && showForm && <MessageAddForm comunidadId={comunidadId} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default MessageBoard;

"use client";

import { deleteMessage } from "@/actions/community/communityMessage";
import { useState } from "react";
import MessageAddForm from "@/components/layouts/Forms/MessageAddForm";
import style from "./style.module.css";

interface Message {
  text: string;
  createdAt: Date;
}

interface Props {
  mensajes: Message[];
  comunidadId: number;
  isAdmin?: boolean;
}

/**
 * Formats a Date object as a Spanish date and time label (dd/mm/yyyy hh:mm).
 *
 * @param date El objeto Date a formatear
 * @returns String with the date in Spanish format
 */
const formatMessageDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

/**
 * Community message board.
 * Shows the list of messages posted by the administrator.
 * If the user is an administrator, they can add and delete messages.
 *
 * @param mensajes List of messages on the board
 * @param comunidadId ID of the community to which the board belongs
 * @param isAdmin Indicates if the current user is an administrator (false by default)
 */
const MessageBoard = ({ mensajes, comunidadId, isAdmin = false }: Props): React.ReactNode => {
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (createdAt: Date) => {
    await deleteMessage(comunidadId, createdAt);
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
              <li key={`${mensaje.createdAt.toISOString()}-${mensaje.text}`} className={style.messageItem}>
                <div className={style.messageContent}>
                  <p className={style.messageText}>{mensaje.text}</p>
                  <p className={style.messageDate}>{formatMessageDate(mensaje.createdAt)}</p>
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    className={style.deleteBtn}
                    aria-label="Eliminar mensaje"
                    onClick={() => handleDelete(mensaje.createdAt)}
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

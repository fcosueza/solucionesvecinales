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

/**
 * Formatea un objeto Date como etiqueta de fecha y hora en español (dd/mm/yyyy hh:mm).
 *
 * @param date El objeto Date a formatear
 * @returns String con la fecha en formato español
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
 * Tablón de mensajes de una comunidad.
 * Muestra la lista de mensajes publicados por el administrador.
 * Si el usuario es administrador, puede añadir y eliminar mensajes.
 *
 * @param mensajes Lista de mensajes del tablón
 * @param comunidadId ID de la comunidad a la que pertenece el tablón
 * @param isAdmin Indica si el usuario actual es administrador (por defecto false)
 */
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

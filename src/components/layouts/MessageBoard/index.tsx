"use client";

import { addMessage, deleteMessage } from "@/actions/community/communityMessage";
import { useRef, useState } from "react";
import style from "./style.module.css";

// Interfaz que define la estructura de un mensaje en el tablero de mensajes
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
 * Función que formatea la fecha de creación de un mensaje para mostrarla en el tablero de mensajes, utilizando el formato "dd/MM/yyyy HH:mm" en español.
 *
 * @param date La fecha a formatear.
 * @returns Una cadena de texto con la fecha formateada.
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
 * Componente que crea un tablero de mensajes para una comunidad, mostrando los mensajes existentes y permitiendo a los administradores agregar o eliminar mensajes.
 *
 * @param mensajes Un array de objetos que representan los mensajes actuales en el tablero, cada uno con su texto y fecha de creación.
 * @param comunidadId El ID de la comunidad a la que pertenecen los mensajes, utilizado para las operaciones de agregar y eliminar mensajes.
 * @param isAdmin Un booleano opcional que indica si el usuario actual tiene permisos de administrador, lo que habilita las funciones de agregar y eliminar mensajes.
 *
 * @returns Un componente React que muestra el tablero de mensajes con las funcionalidades descritas.
 */
const MessageBoard = ({ mensajes, comunidadId, isAdmin = false }: Props): React.ReactNode => {
  const [showForm, setShowForm] = useState(false);
  const [pending, setPending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAdd = async (formData: FormData) => {
    setPending(true);
    await addMessage(comunidadId, formData);
    setPending(false);
    setShowForm(false);
    if (textareaRef.current) textareaRef.current.value = "";
  };

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

      {isAdmin && showForm && (
        <div className={style.overlay} onClick={() => setShowForm(false)}>
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
                <button type="button" className={style.cancelBtn} onClick={() => setShowForm(false)} disabled={pending}>
                  Cancelar
                </button>
                <button type="submit" className={style.submitBtn} disabled={pending}>
                  {pending ? "Publicando..." : "Publicar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBoard;

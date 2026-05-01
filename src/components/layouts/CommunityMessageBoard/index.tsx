import style from "./style.module.css";

interface Message {
  texto: string;
  creadoEn: Date;
}

interface Props {
  mensajes: Message[];
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

const CommunityMessageBoard = ({ mensajes }: Props): React.ReactNode => {
  if (mensajes.length === 0) {
    return (
      <div className={style.boardEmpty}>
        <p className={style.emptyTitle}>No hay mensajes publicados.</p>
        <p className={style.emptyDescription}>Cuando se creen avisos para esta comunidad, apareceran aqui.</p>
      </div>
    );
  }

  return (
    <div className={style.board}>
      <ul className={style.messageList}>
        {mensajes.map(mensaje => (
          <li key={`${mensaje.creadoEn.toISOString()}-${mensaje.texto}`} className={style.messageItem}>
            <p className={style.messageText}>{mensaje.texto}</p>
            <p className={style.messageDate}>{formatMessageDate(mensaje.creadoEn)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityMessageBoard;

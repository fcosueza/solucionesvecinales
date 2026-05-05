import Image from "next/image";
import { formatTimeLabel } from "@/lib/reservations";
import style from "./style.module.css";
interface Props {
  nombre: string;
  descripcion: string;
  horaInicio: Date;
  horaFin: Date;
  imageUrl: string;
  reservationSummary?: string;
  action?: React.ReactNode;
  onDeleteRequest?: () => void;
  isAdmin?: boolean;
}

/**
 *
 * @param nombre El nombre de la zona común.
 * @param descripcion Una breve descripción de la zona común.
 * @param horaInicio La hora de inicio a la que se puede reservar la zona común.
 * @param horaFin La hora de fin a la que se puede reservar la zona común.
 * @param imageUrl La URL de la imagen representativa de la zona común.
 * @param reservationSummary Texto breve con el estado actual de las reservas para la zona.
 * @param action Acción opcional asociada a la zona, como abrir el formulario de reserva.
 *
 * @returns Un componente React que muestra una tarjeta con la información de la zona común
 */
const CardCommonArea = ({
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  imageUrl,
  reservationSummary,
  action,
  onDeleteRequest,
  isAdmin
}: Props): React.ReactNode => {
  return (
    <article className={style.card}>
      <Image src={imageUrl} alt={`Imagen de la zona ${nombre}`} width={320} height={180} className={style.image} />

      <div className={style.content}>
        <h3 className={style.title}>{nombre}</h3>
        <p className={style.description}>{descripcion}</p>
        <p className={style.schedule}>
          Horario: {formatTimeLabel(horaInicio)} - {formatTimeLabel(horaFin)}
        </p>
        {reservationSummary ? <p className={style.reservationSummary}>{reservationSummary}</p> : null}
        <div className={style.actionRow}>
          {action ? <div>{action}</div> : null}
          {isAdmin && onDeleteRequest ? (
            <button type="button" className={style.deleteZoneBtn} onClick={onDeleteRequest}>
              Eliminar
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default CardCommonArea;

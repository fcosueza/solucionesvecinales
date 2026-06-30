import Image from "next/image";
import { formatTimeLabel } from "@/lib/dateFormatting";
import style from "./style.module.css";
interface Props {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  imageUrl: string;
  reservationSummary?: string;
  action?: React.ReactNode;
  onDeleteRequest?: () => void;
  isAdmin?: boolean;
}

/**
 * Component that displays a card with information about a common area.
 *
 * @param name Name of the common area.
 * @param description A brief description of the common area.
 * @param startTime The start time at which the common area can be reserved.
 * @param endTime The end time at which the common area can be reserved.
 * @param imageUrl The URL of the representative image of the common area.
 * @param reservationSummary Brief text with the current status of reserves for the area.
 * @param action Optional action associated with the area, such as opening the reservation form.
 *
 * @returns Un React component showing a card with common area information
 */
const CardCommonArea = ({
  name,
  description,
  startTime,
  endTime,
  imageUrl,
  reservationSummary,
  action,
  onDeleteRequest,
  isAdmin
}: Props): React.ReactNode => {
  return (
    <article className={style.card}>
      <Image src={imageUrl} alt={`Imagen de la zona ${name}`} width={320} height={180} className={style.image} />

      <div className={style.content}>
        <h3 className={style.title}>{name}</h3>
        <p className={style.description}>{description}</p>
        <p className={style.schedule}>
          Horario: {formatTimeLabel(startTime)} - {formatTimeLabel(endTime)}
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

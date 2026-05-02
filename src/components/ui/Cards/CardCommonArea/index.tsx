import Image from "next/image";
import style from "./style.module.css";
interface Props {
  nombre: string;
  descripcion: string;
  horaInicio: Date;
  horaFin: Date;
  imageUrl: string;
}

/**
 * Formatea la fecha y genera una cadena en castellano con el formato "HH:mm".
 *
 * @param date La fecha a formatear.
 * @returns Una cadena con el formato "HH:mm" en castellano.
 */

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

/**
 *
 * @param nombre El nombre de la zona común.
 * @param descripcion Una breve descripción de la zona común.
 * @param horaInicio La hora de inicio a la que se puede reservar la zona común.
 * @param horaFin La hora de fin a la que se puede reservar la zona común.
 * @param imageUrl La URL de la imagen representativa de la zona común.
 *
 * @returns Un componente React que muestra una tarjeta con la información de la zona común
 */
const CardCommonArea = ({ nombre, descripcion, horaInicio, horaFin, imageUrl }: Props): React.ReactNode => {
  return (
    <article className={style.card}>
      <Image src={imageUrl} alt={`Imagen de la zona ${nombre}`} width={320} height={180} className={style.image} />

      <div className={style.content}>
        <h3 className={style.title}>{nombre}</h3>
        <p className={style.description}>{descripcion}</p>
        <p className={style.schedule}>
          Horario: {formatTime(horaInicio)} - {formatTime(horaFin)}
        </p>
      </div>
    </article>
  );
};

export default CardCommonArea;

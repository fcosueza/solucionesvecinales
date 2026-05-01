import Image from "next/image";
import style from "./style.module.css";

interface Props {
  nombre: string;
  descripcion: string;
  horaInicio: Date;
  horaFin: Date;
  imageUrl: string;
}

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

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

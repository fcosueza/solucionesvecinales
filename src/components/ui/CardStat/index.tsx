import style from "./style.module.css";

interface Props {
  title: string;
  value: string;
  description: string;
}

/**
 * Componente que renderiza las estadísticas de la comunidad, mostrando un título, un valor numérico y una descripción.
 *
 * @param title El título que describe la estadística, por ejemplo "Incidentes Reportados".
 * @param value El valor numérico que representa la estadística, por ejemplo "15".
 * @param description Una breve descripción que proporciona contexto adicional sobre la estadística, por ejemplo "Número de incidentes reportados en el último mes".
 *
 * @returns Un componente React que muestra una tarjeta con la estadística formateada de manera clara y visualmente atractiva.
 */
const CardStat = ({ title, value, description }: Props): React.ReactNode => {
  return (
    <article className={style.card}>
      <p className={style.title}>{title}</p>
      <p className={style.value}>{value}</p>
      <p className={style.description}>{description}</p>
    </article>
  );
};

export default CardStat;

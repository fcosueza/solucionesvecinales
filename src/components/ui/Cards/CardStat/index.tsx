import style from "./style.module.css";

interface Props {
  title: string;
  value: string;
  description: string;
}

/**
 * Component that renders community statistics, displaying a title, numeric value, and description.
 *
 * @param title The title that describes the statistic, for example "Reported Incidents."
 * @param value The numerical value that represents the statistic, for example "15."
 * @param description A brief description that provides additional context about the statistic, for example "Number of incidents reported in the last month."
 *
 * @returns Un React component that displays a card with the statistics formatted in a clear and visually attractive way.
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

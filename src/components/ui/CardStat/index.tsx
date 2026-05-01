import style from "./style.module.css";

interface Props {
  title: string;
  value: string;
  description: string;
}

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

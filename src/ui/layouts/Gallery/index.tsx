import style from "./style.module.css";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Gallery = ({ title = "", children }: Props) => {
  return (
    <div className={style.gallery} role="gallery">
      {title != "" ? <h1 className={style.title}>{title}</h1> : null}
      <div className={style.container}>{children}</div>
    </div>
  );
};

export default Gallery;

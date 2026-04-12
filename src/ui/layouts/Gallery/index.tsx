import style from "./style.module.css";

/** Props del componente Gallery. */
interface Props {
  title?: string;
  children: React.ReactNode;
}

/**
 * Renderiza una galería de contenido con título opcional.
 * @param props - Props del componente Gallery.
 * @param props.title - Título opcional de la galería.
 * @param props.children - Elementos hijos que se muestran en la galería.
 */
const Gallery = ({ title = "", children }: Props) => {
  return (
    <div className={style.gallery} role="gallery">
      {title != "" ? <h1 className={style.title}>{title}</h1> : null}
      <div className={style.container}>{children}</div>
    </div>
  );
};

export default Gallery;

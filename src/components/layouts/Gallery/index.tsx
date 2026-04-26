import style from "./style.module.css";

/** Props del componente Gallery. */
interface Props {
  title?: string;
  children: React.ReactNode;
}

/**
 * Componente que renderiza una galería de imágenes con contenido y título opcional.
 *
 * @param props - Props del componente Gallery.
 * @param props.title - Título opcional de la galería.
 * @param props.children - Elementos hijos que se muestran en la galería.
 * @returns La galería de contenido como un elemento React.
 */
const Gallery = ({ title = "", children }: Props): React.ReactNode => {
  return (
    <div className={style.gallery} role="gallery">
      {title != "" ? <h1 className={style.title}>{title}</h1> : null}
      <div className={style.container}>{children}</div>
    </div>
  );
};

export default Gallery;

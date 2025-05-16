import style from "./style.module.css";

interface Props {
  title?: string;
  children: React.ReactNode;
}

/**
 * Componente Gallery
 *
 * Componente que muestra un conjunto de elementos en como si fuera una galería de
 * imágenes, empleando para ello Flex CSS y mostrando un título de forma opcional.
 *
 * @param title Cadena con el título de la galería (opcional)
 * @param children Elementos pasados como hijos que se van a mostrar en la galería.
 *
 * @returns Nodo de React con los elementos pasados mostrados en formato galería.
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

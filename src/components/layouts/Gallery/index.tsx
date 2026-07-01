import style from "./style.module.css";

/** Props del componente Gallery. */
interface Props {
  title?: string;
  children: React.ReactNode;
}

/**
 * Component that renders an image gallery with optional content and title.
 *
 * @param title - Optional gallery title.
 * @param children - Child elements displayed in the gallery.
 *
 * @returns The content gallery as a React element.
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

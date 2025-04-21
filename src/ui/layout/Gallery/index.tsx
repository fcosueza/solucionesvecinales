import style from "./style.module.css";

const Gallery = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className={style.gallery} role="gallery">
      {children}
    </div>
  );
};

export default Gallery;

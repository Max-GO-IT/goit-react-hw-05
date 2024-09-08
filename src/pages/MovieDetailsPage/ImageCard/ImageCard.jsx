import css from './ImageCard.module.css'; 


const ImageCard = ({ image, style }) => {
  return (
    <div className={css.imageCard}>
      <img
        src={image}
        alt="Movie Poster"
        className={css.image}
        style={style}
      />
    </div>
  );
};

export default ImageCard;




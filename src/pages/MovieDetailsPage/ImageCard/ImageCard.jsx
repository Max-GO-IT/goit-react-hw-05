import css from './ImageCard.module.css'; 

const ImageCard = ({ image }) => {
  return (
    <div className={css.imageCard}>
      <img
        src={image}
        alt="Movie Poster"
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;




import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ listMovies }) => {
    const location = useLocation();

    return (
        <ul className={css.movieList}>
            {listMovies.map(movie => (
                <li key={movie.id} className={css.movieItem}>
                    <Link 
                        to={`/movies/${movie.id}`} 
                        className={css.movieLink}
                        state={{ from: location }} 
                    >
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;

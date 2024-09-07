import css from './ListMovies.module.css';
import { Link } from 'react-router-dom';

const ListMovies = ({ listMovies }) => {
    return (
        <ul className={css.movieList}>
            {listMovies.map(movie => (
                <li key={movie.id} className={css.movieItem}>
                    <Link to={`/movies/${movie.id}`} className={css.movieLink}>
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ListMovies;
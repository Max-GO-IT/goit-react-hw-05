import css from './ListMovies.module.css'
import { Link } from 'react-router-dom';

const ListMovies = ({listMovies}) =>{
    return(
        <ul>
          {listMovies.map(movie => (
            <li key={movie.id}>
              <Link to="/movie/{movie.id}">  {movie.title}</Link>
            </li>
          ))}
        </ul>
    )
}

export default ListMovies;
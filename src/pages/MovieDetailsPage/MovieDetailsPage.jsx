import css from './MovieDetailsPage.module.css';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useRef  } from 'react';

//import { useNavigate } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const navigate = useNavigate();
  const prevLocationRef = useRef(location);

  const handleGoBack = () => {
    // navigate(-1);
   
    const prevLocation = prevLocationRef.current;
    if (prevLocation.state?.from) {

      window.history.back();

    } else { 

      window.location.href = '/';

    }
  };

  useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=2b48341452ebcab69d38b1a5ce364348`;
      try {
        const response = await axios.get(url);
        setMovieDetails(response.data);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;

  return (
    <div className={css.movieDetails}>
      <button onClick={handleGoBack}>
        ← Go Back
      </button>

      {movieDetails ? (
        <>
          <h1>{movieDetails.title}</h1>
          <div className={css.posterContainer}>
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <p>{movieDetails.overview}</p>
          <nav className={css.nav}>
            <Link to={`/movies/${movieId}/cast`} className={css.link}>Cast</Link>
            <Link to={`/movies/${movieId}/reviews`} className={css.link}>Reviews</Link>
          </nav>
          <Outlet /> {/* Вставка вложенных маршрутов */}
        </>
      ) : (
        <p>No movie details available</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;

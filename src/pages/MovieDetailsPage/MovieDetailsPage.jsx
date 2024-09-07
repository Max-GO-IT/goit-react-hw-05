import css from './MovieDetailsPage.module.css';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard/ImageCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    if (error) return <p>{error}</p>;

    return (
        <div className={css.movieDetails}>
            {movieDetails ? (
                <>
                    <h1>{movieDetails.title}</h1>
                    <ImageCard image={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} />
                    <p>{movieDetails.overview}</p>
                    <Link to={`/movies/${movieId}/cast`} className={css.link}>Cast</Link>
                    <Link to={`/movies/${movieId}/reviews`} className={css.link}>Reviews</Link>
                </>
            ) : (
                <p>No movie details available</p>
            )}
        </div>
    );
}

export default MovieDetailsPage;

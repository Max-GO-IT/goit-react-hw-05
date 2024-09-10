import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css'

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMovieReviews = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=2b48341452ebcab69d38b1a5ce364348`;
        try {
            const response = await axios.get(url);
            setReviews(response.data.results); 
        } catch (err) {
            setError('Failed to fetch reviews');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovieReviews(movieId);
    }, [movieId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={css.reviewsContainer}>
            {reviews.length > 0 ? (
                <ul className={css.reviewsList}>
                    {reviews.map(review => (
                        <li key={review.id} className={css.reviewItem}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available</p>
            )}
        </div>
    );
};

export default MovieReviews;




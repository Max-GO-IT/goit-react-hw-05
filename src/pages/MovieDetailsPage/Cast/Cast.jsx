import css from './Cast.module.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ImageCard from '../ImageCard/ImageCard';

const Cast = () => {
    const { movieId } = useParams();
    const [casts, setCasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMovieCredits = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2b48341452ebcab69d38b1a5ce364348`;
        try {
            const response = await axios.get(url);
            setCasts(response.data.cast.map(({ id, name, character, profile_path }) => ({ id, name, character, profile_path })));
        } catch (err) {
            setError('Failed to fetch cast details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovieCredits();
    }, [movieId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={css.castContainer}>
            <ul className={css.castList}>
                {casts.map(cast => (
                    <li key={cast.id} className={css.castItem}>
                        <h2>{cast.name}</h2>
                        <ImageCard image={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} />
                        <p>{cast.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cast;

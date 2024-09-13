import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import SearchBar from './SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [listMoviesBySearch, setListMoviesBySearch] = useState([]);
    
    const query = searchParams.get("query") ?? "";

    const getListSearch = (searchVal) => {
        if (!searchVal) return; 

        const url = `https://api.themoviedb.org/3/search/movie?api_key=2b48341452ebcab69d38b1a5ce364348&query=${encodeURIComponent(searchVal)}`;

        axios.get(url)
            .then(response => {
                const movies = response.data.results.map(({ title, release_date, poster_path, popularity, overview, id, genre_ids }) => ({
                    title,
                    release_date,
                    poster_path,
                    popularity,
                    overview,
                    id,
                    genre_ids
                }));
                setListMoviesBySearch(movies);
                setIsLoading(false); 
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false); 
            });
    };

    useEffect(() => {
        if (query) {
            getListSearch(query);
        }
    }, [query]);

    const SubmitOn = (query) => {
        setSearchParams({ query }); 
    };

    return (
        <>
            <p>Movies</p>
            <SearchBar SubmitOn={SubmitOn} />
            {isLoading ? (
                <p>Loading...</p>
            ) : listMoviesBySearch.length > 0 ? (
                <MovieList listMovies={listMoviesBySearch} />
            ) : (
                <p>No movies found</p>
            )}
        </>
    );
}

export default MoviesPage;

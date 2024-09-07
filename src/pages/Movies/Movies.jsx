import { useState, useEffect } from 'react';
import css from './Movies.module.css';
import Navbar from "../../components/NavBar/Navbar";
import SearchBar from '../Movies/SearchBar/SearchBar';
import ListMovies from '../../components/ListMovies/ListMovies';

const Movies = ({ searchString, listMoviesBySearch, SubmitOn, SearchValInput }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false); 
    }, [listMoviesBySearch]);

    return (
        <>
            <Navbar />
            <p>Movies</p>
            <SearchBar 
                searchString={searchString} 
                SubmitOn={SubmitOn} 
                SearchValInput={SearchValInput} 
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : listMoviesBySearch.length > 0 ? (
                <ListMovies listMovies={listMoviesBySearch} />
            ) : (
                <p>No movies found</p>
            )}
        </>
    );
}

export default Movies;

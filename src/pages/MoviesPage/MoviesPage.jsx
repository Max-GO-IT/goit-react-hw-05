import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import SearchBar from './SearchBar/SearchBar';
import ListMovies from '../../components/ListMovies/ListMovies';
import axios from 'axios';

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [listMoviesBySearch, setListMoviesBySearch] = useState([]);
    
    const [searchString, setSearchString] = useState(() => {
      return  searchParams.get('query') ||localStorage.getItem('searchString')|| "";
  });
    
   
    const getListSearch = (searchVal) => {
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
      localStorage.setItem('searchString', searchString);
        if (searchString) {
            getListSearch(searchString);
        } else {
            setListMoviesBySearch([]);
            setIsLoading(false); 
            

        }
    }, [searchString,searchParams]);
    const SubmitOn = () => {
        setSearchParams({ query: searchString }); 
    };

    const SearchValInput = (e) => {
        setSearchString(e.target.value); 
        
    };

    return (
        <>
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

export default MoviesPage;

import { useState, useEffect } from 'react';
import Navbar from "../../components/NavBar/Navbar";
import SearchBar from './SearchBar/SearchBar';
import ListMovies from '../../components/ListMovies/ListMovies';
import axios from 'axios';

const Movies = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [listMoviesBySearch, setListMoviesBySearch] = useState([]);
    const [searchString, setSearchString] = useState("");
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
          })
          .catch(err => console.error(err));
      }
    
      const SubmitOn = () => {
        getListSearch(searchString)
      };
    
    const SearchValInput = (e) => {
        setSearchString(e.target.value);
      };
    
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

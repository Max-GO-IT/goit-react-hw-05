
import { Routes, Route } from "react-router-dom";
// import Home from "path/to/pages/Home/Home";
// import Movies from "path/to/pages/Movies/Movies";
// import MovieDetailsPage from "path/to/pages/MovieDetailsPage/MovieDetailsPage";


import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";

import { useState, useEffect } from "react";
import axios from "axios";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";



function App() {
  const [listMovies, setListMovies] = useState([]);
  const [listMoviesBySearch, setListMoviesBySearch] = useState([]);
  const [searchString, setSearchString] = useState("");



  const getListHome = () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=2b48341452ebcab69d38b1a5ce364348';
    // const options = {
    //   headers: {
    //     Authorization: 'Bearer 2b48341452ebcab69d38b1a5ce364348'  
    //   }
    // };

    axios.get(url)
      .then(response => setListMovies(response.data.results.map(({ id, title }) => ({ id, title }))))
      .catch(err => console.error(err));
  };

  useEffect(() => {
  
    getListHome();
  }, []);
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

    

  //     const getMovieCredits = (movie_id) => {
  //       const url = 'https://api.themoviedb.org/3/movie/{movie_id}/credits';
  //       const options = {
  //         headers: {
  //           Authorization: '2b48341452ebcab69d38b1a5ce364348'
  //         }
  //       };
          
  //       axios.get(url, options)
  //         .then(response => console.log(response))
  //         .catch(err => console.error(err));
  //       }

  //       const getMovieReviews = (movie_id) => {
  //         const url = 'https://api.themoviedb.org/3/movie/{movie_id}/reviews';
  //         const options = {
  //           headers: {
  //             Authorization: '2b48341452ebcab69d38b1a5ce364348'
  //           }
  //         };
            
  //         axios.get(url, options)
  //           .then(response => console.log(response))
  //           .catch(err => console.error(err));
  //         }
  const SubmitOn = () => {
    getListSearch(searchString)
  };
  const SearchValInput = (e) => {
    setSearchString(e.target.value);
  };


  return (
<Routes>
  <Route path="/" element={<Home listMovies={listMovies} />} />
  <Route path="/movies" element={<Movies searchString={searchString} listMoviesBySearch={listMoviesBySearch} SubmitOn={SubmitOn} SearchValInput={SearchValInput} />} />
  <Route path="/movies/:movieId" element={<MovieDetailsPage />} />

</Routes>
  );
}

export default App;

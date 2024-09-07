
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "path/to/pages/Home";
import Movies from "path/to/pages/Movies";
import MovieDetailsPage from "path/to/pages/MovieDetailsPage";


// import Home from "../../pages/Home/Home";
// import Movies from "../../pages/Movies/Movies";
// import Movies from "../../pages/Movies";
import { useState, useEffect } from "react";
import axios from "axios";
// import MovieDetailsPage from "../../pages/Movies/MovieDetailsPage/MovieDetailsPage";



function App() {
  const [listMovies, setListMovies] = useState([]);
  const [listMoviesBySearch, setListMoviesBySearch] = useState([]);
  const [searchString, setSearchString] = useState("");


  // Определяем функцию вне useEffect
  const getListHome = () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=2b48341452ebcab69d38b1a5ce364348';
    // const options = {
    //   headers: {
    //     Authorization: 'Bearer 2b48341452ebcab69d38b1a5ce364348'  // Добавьте 'Bearer ' перед вашим ключом
    //   }
    // };

    axios.get(url)
      .then(response => setListMovies(response.data.results.map(({ id, title }) => ({ id, title }))))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // Вызываем функцию внутри useEffect
    getListHome();
  }, []);
  const getListSearch = (searchVal) => {
    // Correctly format the URL with the search value
    const url = `https://api.themoviedb.org/3/search/movie?api_key=2b48341452ebcab69d38b1a5ce364348&query=${encodeURIComponent(searchVal)}`;
  
    axios.get(url)
      .then(response => {
        // Use `results` instead of `result`
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
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/movies" element={<Movies searchString = {searchString} listMoviesBySearch = {listMoviesBySearch} SubmitOn={SubmitOn}  SearchValInput={ SearchValInput}/>} >
         <Route path=":movieId" element={<MovieDetailsPage />} />
         {/* <Route path="/movies" element={<Movies />} />
         <Route path="/movies" element={<Movies />} /> */}
      </Route>
    </Routes>
  );
}

export default App;

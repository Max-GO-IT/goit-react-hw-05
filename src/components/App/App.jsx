
import { Routes, Route } from "react-router-dom";
// import Home from "path/to/pages/Home/Home";
// import Movies from "path/to/pages/Movies/Movies";
// import MovieDetailsPage from "path/to/pages/MovieDetailsPage/MovieDetailsPage";

import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import Cast from "../../pages/MovieDetailsPage/Cast/Cast";
import Reviews from "../../pages/MovieDetailsPage/Reviews/Reviews";


const App = ()=> {

  return (
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movies" element={<Movies/>} />
  <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
      <Route path="cast" element={<Cast />} />
      <Route path="reviews" element={<Reviews />} />
  </Route>

</Routes>
  );
}

export default App;

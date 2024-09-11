import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../NavBar/Navbar.jsx';


const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../../pages/MovieDetailsPage/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../pages/MovieDetailsPage/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <>
    <Navbar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    </>
  );
};

export default App;

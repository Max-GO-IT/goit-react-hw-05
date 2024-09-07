// import { lazy, Suspense } from "react";
import {Link} from "react-router-dom";
// const Navbar = lazy(() => import("../../components/NavBar/Navbar"));
import Navbar from "../../components/NavBar/Navbar";
import ListMovies from "../../components/ListMovies/ListMovies";
const Home = ({ listMovies }) => {
    return (
      <>
        <Navbar />
        <ListMovies listMovies = {listMovies}/>
      </>
    );
  }
  
  export default Home;
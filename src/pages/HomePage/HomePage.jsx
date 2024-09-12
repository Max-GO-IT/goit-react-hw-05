import MovieList from "../../components/MovieList/MovieList";
import { useEffect,useState } from "react";
import axios from "axios";

const Home = () => {
  const [listMovies, setListMovies] = useState([]);
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
    return (
      <>
       
        <MovieList listMovies = {listMovies}/>
      </>
    );
  }
  
  export default Home;
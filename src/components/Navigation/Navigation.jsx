import { NavLink } from 'react-router-dom';
import css from'./Navigation.module.css'; 

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink 
            to="/" 
            exact 
            className="nav-link" 
            activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/movies" 
            className="nav-link" 
            activeClassName="active">
            Movies
          </NavLink>
        </li>
       
      </ul>
    </nav>
  );
};
export default Navigation
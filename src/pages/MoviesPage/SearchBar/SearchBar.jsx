import { toast } from 'react-hot-toast';
import { useState } from 'react';

const SearchBar = ({ SubmitOn }) => { 
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a search term.'); 
      return;
    }
    
    SubmitOn(query); 
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default SearchBar;

import { toast } from 'react-hot-toast';

const SearchBar = ({ searchString, SearchValInput, SubmitOn }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (searchString.trim() === '') {
      toast.error('Please enter a search term.'); 
      return;
    }
    
    SubmitOn(); 
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          onChange={SearchValInput}
          value={searchString}
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

import { useEffect, useState } from 'react';
import './App.css';
import { SearchForm } from './components/SearchField/SearchForm';

export default function App() {
  const [movies,setMovies] = useState([]) 

  useEffect(() => {
    document.title = "Movie Finder";
  })


  const handleClick = (movies) => {
    setMovies(movies);
  }
//
  return (
    <div className="App">
      <h1>Movie Finder</h1>
      <SearchForm handleClick={handleClick}/>
      { 
      
        movies.length > 0 ? movies.map(({id, title}) =>(
        <li key={id}> Movie title: {title}</li> 
      )) : <h2>No movies!</h2>}
    </div>
  );
}



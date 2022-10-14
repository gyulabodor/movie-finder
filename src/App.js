import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import { SearchForm } from './components/SearchField/SearchForm';

export default function App() {
  const [movies,setMovies] = useState([]) 

  useEffect(() => {
    document.title = "Movie Finder";
  })

  const handleSearchClick = (movies) => {
    setMovies(movies);
  }

  return (
    <div className="App">
      <Typography variant='h'>Movie Finder</Typography>
      <SearchForm handleClick={handleSearchClick}/>
      <MovieList movies={movies}/>
    </div>
  );
}



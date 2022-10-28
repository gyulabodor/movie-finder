import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import { SearchForm } from './components/SearchField/SearchForm';
import { LoadingContext } from './utilities/Context';
import { Spinner } from "./components/Spinner/Spinner";


export default function App() {
  const [movies,setMovies] = useState([]) 
  const [loading, setLoading] = useState(false); 
  
  useEffect(() => {
    document.title = "Movie Finder";
  })

  const handleSearchClick = (movies) => {
    setMovies(movies);
  }

  return (
    <LoadingContext.Provider value={{loading,setLoading}}>
      <div className="App">
        <Typography variant='h4'>Movie Finder</Typography>
        <SearchForm handleClick={handleSearchClick}/>
        <MovieList movies={movies}/>
        { loading ? <Spinner isLoading={loading}/> : ""}
      </div>
    </LoadingContext.Provider>
  );
}



import { Stack, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';
import MovieList from './components/MovieList/MovieList';
import { SearchForm } from './components/SearchField/SearchForm';
import { LoadingContext, MovieListContext } from './utilities/Context';
import { Spinner } from "./components/Spinner/Spinner";
import { appStackStyle } from './appStyle';
import { theme } from './appTheme'

export default function App() {
  const [movies,setMovies] = useState([]) 
  const [loading, setLoading] = useState(false); 
  
  return (
    <ThemeProvider theme={theme}>
      <LoadingContext.Provider value={{loading,setLoading}}>
        <MovieListContext.Provider value={{movies,setMovies}}>
          <Stack
            direction="column"
            sx={appStackStyle}
          >
            <Typography variant='h4'>Movie Finder</Typography>
            <SearchForm/>
            <MovieList movies={movies}/>
            { loading ? <Spinner isLoading={loading}/> : ""}
          </Stack>
        </MovieListContext.Provider>
      </LoadingContext.Provider>
    </ThemeProvider>
  );
}



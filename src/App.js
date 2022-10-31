import { Stack, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';
import MovieList from './components/MovieList/MovieList';
import { SearchForm } from './components/SearchField/SearchForm';
import { LoadingContext, MovieListContext, InfoContext } from './utilities/Context';
import { Spinner } from "./components/Spinner/Spinner";
import { appStackStyle, appTitleStyle} from './appStyle.js';
import { theme } from './appTheme'

export default function App() {
  const [movies,setMovies] = useState([]) 
  const [loading, setLoading] = useState(false); 
  const [isRelated, setIsRelated] = useState(false);
  const [searched,setSearched] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <LoadingContext.Provider value={{loading,setLoading}}>
        <MovieListContext.Provider value={{movies,setMovies}}>
          <Stack
            direction="column"
            sx={appStackStyle}
          >
            <Typography 
              variant='h3'
              sx={appTitleStyle}
            >Movie Finder
            </Typography>
            <InfoContext.Provider value={{isRelated,setIsRelated,searched,setSearched}}>
              <SearchForm/>
              <MovieList movies={movies}/>
            </InfoContext.Provider>
            { loading ? <Spinner isLoading={loading}/> : ""}
          </Stack>
        </MovieListContext.Provider>
      </LoadingContext.Provider>
    </ThemeProvider>
  );
}



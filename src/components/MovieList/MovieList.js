import { List, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { InfoContext } from '../../utilities/Context';
import MovieListItem from '../MovieListItem/MovieListItem';
import { movieListStyle,infoMessageStyle } from './style.js';

export default function MovieList({movies}) {
    const {isRelated, searched} = useContext(InfoContext);
    
    return (
        <>  { searched ? 
                <Typography 
                variant='h4'
                sx={infoMessageStyle}
                >
                    { isRelated ? "Related results:" :  "Search results:" }
                </Typography> : 
                ""
            }
            <List sx={movieListStyle}>
                { 
                    movies.length > 0 ? movies.map(({id,name,score,releaseDate,img}) =>( 
                    
                    <MovieListItem
                        movieID={id}
                        name={name}
                        score={score}
                        releaseDate={releaseDate}
                        img={img}
                        key={id}
                    />
                    )) : ""
                }
            </List>
        </>
  )
}


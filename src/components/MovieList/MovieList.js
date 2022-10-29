import { WindowSharp } from '@mui/icons-material'
import { List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import MovieListItem from '../MovieListItem/MovieListItem'
import { movieListStyle, infoBoxStyle } from './style.js'

export default function MovieList({movies}) {

    useEffect(() => {
        window.scrollTo(0,0);
    })

    return (
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
                )) : 
                <Box sx={infoBoxStyle}>
                    <Typography 
                        variant='h4'
                    >
                     No movies found!
                    </Typography>    
                </Box>
            }
        </List>
  )
}


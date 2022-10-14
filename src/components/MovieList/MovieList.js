import { List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MovieListItem from '../MovieListItem/MovieListItem'
import { movieListStyle, infoBoxStyle } from './style.js'

export default function MovieList({movies}) {


    return (
        <List sx={movieListStyle}>
            { 
                movies.length > 0 ? movies.map(({id,title,score,releaseDate,img}) =>( 
                <MovieListItem
                    id={id}
                    title={title}
                    score={score}
                    releaseDate={releaseDate}
                    img={img}
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


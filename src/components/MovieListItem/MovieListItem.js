import React, { useState, useContext } from 'react'
import { 
  avatarStyle, 
  listItemTextStyle, 
  listTyphoBodyStyle, 
  movieTitleStyle,
  expandIconStyle,
  summaryBodyStyle,
  linkStyle,
  linkStackStyle,
  accordionStyle
} from './style.js'
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar, 
  Box, 
  ListItem, 
  ListItemAvatar, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Link,
  Button,
  Divider
} from '@mui/material'
import { DateTime } from 'luxon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/system';
import { imdb_url, wiki_article_url } from '../../configuration/env.js';
import { fetchWikipedia } from '../../requests/fetchWikipedia.js';
import { fetchIMDB } from '../../requests/fetchIMDB.js';
import { getYear } from '../../utilities/getYear.js';
import { LoadingContext, MovieListContext } from '../../utilities/Context.js';
import { fetchTMDBDiscoverMovies, fetchTMDBGetActorByMovie } from '../../requests/fetchTMDB.js';

export default function MovieListItem({movieID,name,score,releaseDate,img}) {

  const [overview,setOverview] = useState("");
  const [wikiLink,setWikiLink] = useState("");
  const [hasWiki,setHasWiki] = useState(false);
  const [hasImdb,setHasImdb] = useState(false);
  const [imdbLink,setImdbLink] = useState("");
  const [hasExtended, setHasExtended] = useState(false);
  const {movies,setMovies} = useContext(MovieListContext);
  const {loading,setLoading} = useContext(LoadingContext);

  const validateImg = (img) => {
    if(img !== null){
      return img.url;
    }
    return process.env.PUBLIC_URL + "/no-img.png";
  }

  const validateReleaseDate = (releaseDate) => {
    if(releaseDate !== null){
     return DateTime.fromISO(releaseDate).toFormat(
        "MMMM dd, yyyy"
      );
    }
    return "unknown";
  } 

  const setWikiResult = async () => {
    const page = await fetchWikipedia(name);
    const pageId = Object.keys(page)[0];
    
    if (pageId !== "-1") {
      setOverview(page[`${pageId}`].extract);
      setWikiLink(`${wiki_article_url}=${pageId}`);
      setHasWiki(true);
    }
    else{
      setOverview("Couldn't get infromation about the summary!");
    }
  }

  const setIMDBResult = async () => {
    const imdbResults = await fetchIMDB(name);
    console.log(imdbResults)
    if('results' in imdbResults){

      let searchedYear = getYear(releaseDate);
      let i = 0;
      while (i < imdbResults.results.length && 
        (imdbResults.results[i].title !== name || imdbResults.results[i].year !== searchedYear) 
        && imdbResults.results[i].titleType !== "movie") 
        { i++; }
      
      let imdbId;
      if(i < imdbResults.results.length){
          imdbId = imdbResults.results[i].id;

          setImdbLink(`${imdb_url}${imdbId}`);
          setHasImdb(true);
      } 
    }
  }

  const handleExtendListItem = async () => {
    if (!hasExtended) {
      setWikiResult();
      setIMDBResult();
      setHasExtended(true)
    }
  }

  const handleRelatedMoviesButton = async () => {

      setLoading(true);
    
      const resultMovie= await fetchTMDBGetActorByMovie(movieID);
      const actorID = resultMovie.data.movie.cast[0].person.id;
      const resultMovies = await fetchTMDBDiscoverMovies(actorID);
      const relatedMovies = resultMovies.data.discoverMovies

      let i = 0;
      while (i < relatedMovies.length && relatedMovies[i].name !== name) 
      { i++; }

      if (i< relatedMovies.length) {
        let movie = relatedMovies[0];
        relatedMovies[0] = relatedMovies[i];
        relatedMovies[i] = movie;
      }

      setMovies(relatedMovies);
      setLoading(false);
  }

  return (
    <ListItem onClick={handleExtendListItem} key={movieID}>
      <Box>
        <Accordion sx={accordionStyle}>
          <AccordionSummary 
            id={`${movieID}-panel`}
            aria-controls={`${movieID}-header`}
            expandIcon={
              <ExpandMoreIcon sx={expandIconStyle}/>
            }
          >
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar 
                  variant='rounded'
                  src={validateImg(img)} 
                  sx={avatarStyle}
                />
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText 
              primary={
                <>
                  <Typography sx={movieTitleStyle}>{name}</Typography>
                </>
              }
              secondary={
                <>
                  <Typography 
                    sx={listTyphoBodyStyle} 
                    variant='body2'>
                      Score: {score}
                  </Typography>
                  <Typography 
                    sx={listTyphoBodyStyle} 
                    variant='body2'>
                      Release: {validateReleaseDate(releaseDate)}
                  </Typography>
                </>
              }
              sx={listItemTextStyle}  
            />
          
          </AccordionSummary>
          <AccordionDetails>
              <Typography
                sx={summaryBodyStyle}
                variant='body2'
              >
                {overview}
              </Typography>
              <Stack 
                direction="row"
                spacing={2}
                alignItems='center'
                divider={<Divider orientation="vertical" flexItem />}
                sx={linkStackStyle}
              >{ hasWiki ?  
                <Link
                  target="_blank"
                  underline='none'
                  rel="noopener"
                  href={wikiLink} 
                  sx={linkStyle}
                >Wikipedia
                </Link> : ""
              }
              {
                hasImdb ? 
                <Link
                    target="_blank"
                    underline='none'
                    rel="noopener"
                    href={imdbLink} 
                    sx={linkStyle}
                >IMDB
                </Link> : ""
              } 
                  <Button 
                    onClick={handleRelatedMoviesButton}
                    variant='contained'
                    color='error'
                    size='small'
                  >
                    Related Movies
                  </Button>
              </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </ListItem>
  )
}

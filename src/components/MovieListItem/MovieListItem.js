import React, { useState } from 'react'
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
import { wiki_article_url } from '../../configuration/env.js';
import { fetchWikipedia } from '../../requests/fetchWikipedia.js';
export default function MovieListItem({id,name,score,releaseDate,img}) {

  const [overview,setOverview] = useState("")
  const [wikiLink,setWikiLink] = useState("")
  const [imdbLink,setImdbLink] = useState("")


  const validateImg = () => {

    if(img !== null){
      return img.url
    }
    return img
  }

  const handleExtendListItem = async () =>{

    const page = await fetchWikipedia(name);
    console.log(page);
    const pageId = Object.keys(page)[0]


    if (pageId !== -1) {
      setOverview(page[`${pageId}`].extract)
      setWikiLink(`${wiki_article_url}=${pageId}`)
    }else{
      setOverview("Overview is missing from Wikipedia!")
    }


  }

  return (
    <ListItem onClick={handleExtendListItem} key={id}>
      <Box>
        <Accordion sx={accordionStyle}>
          <AccordionSummary 
            id={`${id}-panel`}
            aria-controls={`${id}-header`}
            expandIcon={
              <ExpandMoreIcon sx={expandIconStyle}/>
            }
          >
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar 
                  variant='rounded'
                  src={validateImg()} 
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
                      Release: {
                        DateTime.fromISO(releaseDate).toFormat(
                        "MMMM dd, yyyy"
                      )}
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
              >
                  <Link
                    target="_blank"
                    underline='none'
                    rel="noopener"
                    href={wikiLink} 
                    sx={linkStyle}>Wikipedia
                  </Link>
                  <Link sx={linkStyle}>IMDB</Link>
                  <Button 
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

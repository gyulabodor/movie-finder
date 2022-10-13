import React from 'react'
import { 
  movieListStyle, 
  avatarStyle, 
  listItemTextStyle, 
  listTyphoBodyStyle, 
  movieTitleStyle,
  expandIconStyle,
  summaryBodyStyle,
  linkStyle,
  linkStackStyle
} from './style.js'
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Link,
  Button,
  Divider
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/system';


export default function Movie({id,title,overview,score,releaseDate,img}) {


  return (
    <Box>
      <List>
        <Accordion sx={movieListStyle}>
          <AccordionSummary 
            id={`${id}-panel`}
            aria-controls={`${id}-header`}
            expandIcon={
              <ExpandMoreIcon sx={expandIconStyle}/>
            }
          >
            <ListItem>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar 
                  variant='rounded'
                  src={img} 
                  sx={avatarStyle}
                />
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText 
              primary={
                <>
                  <Typography sx={movieTitleStyle}>{title}</Typography>
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
                      Release: {releaseDate}
                  </Typography>
                </>
              }
              sx={listItemTextStyle}  
            />
          </ListItem>
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
                  <Link sx={linkStyle}>Wikipedia</Link>
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
      </List>
    </Box>
  )
}

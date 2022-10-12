import { Button, TextField } from "@mui/material"
import { useState } from "react"
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import { Stack } from "@mui/system";



export const SearchForm = ({handleClick}) => {
    
    const [searchTitle,setSearchTitle] = useState("");
    const [searchResults,setSearchResult] = useState("");    
    
    const movie1= {
        id: 1,
        title: "Harry Potter 1"
    }
    const movie2 = {
        id: 2,
        title: "Indiana Jones"
    }
    const movie3 = {
        id: 3,
        title: "Star Wars"
    }


    const movies= [movie1, movie2, movie3]

    const submitSearch = (movies) => {
         console.log(searchTitle);
         handleClick(movies)
    }
    
    

    return(
        <Stack spacing={2} direction="row">
            <TextField 
                label="Movie title" 
                variant="outlined" 
                size="large"
                color="error"
                type="text"
                onChange={e => setSearchTitle(e.target.value)}
            />
                
            <Button
                onClick={e => submitSearch(movies)} 
                variant="contained" 
                size="large"
                color="error"
                startIcon={<LocationSearchingOutlinedIcon/>}
                > 
                Search
            </Button>
        </Stack>
    )
}

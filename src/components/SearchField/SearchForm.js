import { Button, TextField } from "@mui/material"
import { useState } from "react"
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import { Stack } from "@mui/system";
import { fetchTMDBSearchMovie } from "../../requests/fetchTMDB";



export const SearchForm = ({handleClick}) => {
    
    const [searchTitle,setSearchTitle] = useState("");
    const [searchResults,setSearchResult] = useState("");    

    const submitSearch = async () => {
        
        const resultArray = await fetchTMDBSearchMovie(searchTitle);
        const movies = resultArray.data.searchMovies
        handleClick(movies)
        setSearchTitle("")
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
                onClick={e => submitSearch()} 
                variant="contained" 
                size="large"
                color="error"
                startIcon={<LocationSearchingOutlinedIcon/>}
            >Search
            </Button>
        </Stack>
    )
}

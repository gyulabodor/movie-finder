import { Button, TextField } from "@mui/material"
import { useContext, useState } from "react"
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import { Stack } from "@mui/system";
import { fetchTMDBSearchMovie } from "../../requests/fetchTMDB";
import { LoadingContext } from "../../utilities/Context";


export const SearchForm = ({handleClick}) => {
    
    const [searchTitle,setSearchTitle] = useState("");
    const {setLoading} = useContext(LoadingContext);

    const submitSearch = async () => {
        if (searchTitle !== "") {
            setLoading(true);
            const resultArray = await fetchTMDBSearchMovie(searchTitle);
            const movies = resultArray.data.searchMovies;
            setLoading(false);
            handleClick(movies);
            setSearchTitle("");    
        }
    }

    return(
        <Stack spacing={2} direction="row">
            <TextField 
                label="Movie title" 
                variant="outlined" 
                size="large"
                color="error"
                type="text"
                value={searchTitle}
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

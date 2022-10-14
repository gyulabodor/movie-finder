import { Button, TextField } from "@mui/material"
import { useState } from "react"
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import { Stack } from "@mui/system";



export const SearchForm = ({handleClick}) => {
    
    const [searchTitle,setSearchTitle] = useState("");
    const [searchResults,setSearchResult] = useState("");    
    
    const movie1= {
        id: 1, 
        title: "Harry Potter - A Tökfilkó",
        overview: "jlkajsdkléasdéaskdjaskdléajsda klajsdklajsd asdasdasdasd asdasdasda sda asdas aklsjdaklsédjasklédjas aklésjdaklsdjaésldkjasdé aéskldj",
        releaseDate: "2022.10.11",
        img: "https://cdn.myshoptet.com/usr/www.heliumking.hu/user/shop/big/19857_https-www-heliumking-ro-api-v1-image-query-product-17-94-74-190803145523-kuzelna-palicka-z-harryho-pottera-jpg.jpg?624e2d78",
        score: 8.5
    }
    const movie2= {
        id: 2, 
        title: "HP - Az aranyerek kamrája",
        overview: "jlkajsdkléasdéaskdjaskdléajsda klajsdklajsd asdasdasdasd asdasdasda sda asdas aklsjdaklsédjasklédjas aklésjdaklsdjaésldkjasdé aéskldj",
        releaseDate: "2022.10.11",
        img: "https://cdn.myshoptet.com/usr/www.heliumking.hu/user/shop/big/19857_https-www-heliumking-ro-api-v1-image-query-product-17-94-74-190803145523-kuzelna-palicka-z-harryho-pottera-jpg.jpg?624e2d78",
        score: 8.5
    }
    const movie3= {
        id: 3, 
        title: "HP - A bűz serlege",
        overview: "jlkajsdkléasdéaskdjaskdléajsda klajsdklajsd asdasdasdasd asdasdasda sda asdas aklsjdaklsédjasklédjas aklésjdaklsdjaésldkjasdé aéskldj",
        releaseDate: "2022.10.11",
        img: "https://cdn.myshoptet.com/usr/www.heliumking.hu/user/shop/big/19857_https-www-heliumking-ro-api-v1-image-query-product-17-94-74-190803145523-kuzelna-palicka-z-harryho-pottera-jpg.jpg?624e2d78",
        score: 8.5
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
            >Search
            </Button>
        </Stack>
    )
}

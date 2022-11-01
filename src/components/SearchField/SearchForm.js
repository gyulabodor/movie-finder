import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import { Stack } from "@mui/system";
import { fetchTMDBSearchMovie } from "../../requests/fetchTMDB";
import {
  MovieListContext,
  InfoContext,
  LoadingContext,
} from "../../utilities/Context";

export const SearchForm = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const { setLoading } = useContext(LoadingContext);
  const { setMovies } = useContext(MovieListContext);
  const { setIsRelated, setSearched } = useContext(InfoContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  }

  const submitSearch = async () => {
    if (searchTitle !== "") {
      setLoading(true);
      const resultArray = await fetchTMDBSearchMovie(searchTitle);
      setMovies(resultArray.data.searchMovies);
      setSearchTitle("");
      setIsRelated(false);
      setSearched(true);
      setLoading(false);
    }
    else{
      setLoading(true);
      setMovies([]);
      setSearchTitle("");
      setIsRelated(false);
      setSearched(false);
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} direction="row">
      <TextField
        label="Movie title"
        variant="outlined"
        size="large"
        color="error"
        type="text"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      />

      <Button
        onClick={(e) => submitSearch()}
        variant="contained"
        size="large"
        color="error"
        startIcon={<LocationSearchingOutlinedIcon />}
      >
        Search
      </Button>
    </Stack>
  );
};

import React, { useState, useContext } from "react";
import {
  avatarStyle,
  listTyphoBodyStyle,
  expandIconStyle,
  summaryBodyStyle,
  linkStyle,
  linkStackStyle,
  accordionStyle,
  accordionStackStyle,
  listItemStyle,
} from "./style.js";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Typography,
  Link,
  Button,
  Divider,
} from "@mui/material";
import { DateTime } from "luxon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";
import { imdb_url, wiki_article_url } from "../../configuration/env.js";
import { fetchWikipedia } from "../../requests/fetchWikipedia.js";
import { fetchIMDB } from "../../requests/fetchIMDB.js";
import { getYear } from "../../utilities/getYear.js";
import {
  LoadingContext,
  MovieListContext,
  InfoContext,
} from "../../utilities/Context.js";
import {
  fetchTMDBDiscoverMovies,
  fetchTMDBGetActorByMovie,
} from "../../requests/fetchTMDB.js";

export default function MovieListItem({
  movieID,
  name,
  score,
  releaseDate,
  img,
}) {
  const [overview, setOverview] = useState("");
  const [wikiLink, setWikiLink] = useState("");
  const [hasWiki, setHasWiki] = useState(false);
  const [hasImdb, setHasImdb] = useState(false);
  const [imdbLink, setImdbLink] = useState("");
  const [hasExtended, setHasExtended] = useState(false);
  const { setMovies } = useContext(MovieListContext);
  const { setLoading } = useContext(LoadingContext);
  const { setIsRelated } = useContext(InfoContext);

  const validateImg = (img) => {
    if (img !== null) {
      return img.url;
    }
    return process.env.PUBLIC_URL + "/no-img.png";
  };

  const validateReleaseDate = (releaseDate) => {
    if (releaseDate !== null) {
      return DateTime.fromISO(releaseDate).toFormat("MMMM dd, yyyy");
    }
    return "unknown";
  };

  const validateWikiResult = (wikiExtract, pageId) => {
    if (pageId === "-1") {
      return false;
    }
    if (
      wikiExtract.includes("may refer to") ||
      wikiExtract.includes("may also refer to")
    ) {
      return false;
    }
    return true;
  };
  const setWikiResult = async () => {
    setLoading(true);
    const page = await fetchWikipedia(name);
    const pageId = Object.keys(page)[0];
    const wikiExtract = page[`${pageId}`].extract;

    if (validateWikiResult(wikiExtract, pageId)) {
      setOverview(wikiExtract);
      setWikiLink(`${wiki_article_url}=${pageId}`);
      setHasWiki(true);
    } else {
      setOverview("Couldn't get infromation about the summary!");
    }
    setLoading(false);
  };

  const setIMDBResult = async () => {
    const imdbResults = await fetchIMDB(name);
    if ("results" in imdbResults) {
      let searchedYear = getYear(releaseDate);
      let i = 0;
      while (
        i < imdbResults.results.length &&
        (imdbResults.results[i].title !== name ||
          imdbResults.results[i].year !== searchedYear ||
          imdbResults.results[i].titleType !== "movie")
      ) {
        i++;
      }

      let imdbId;
      if (i < imdbResults.results.length) {
        imdbId = imdbResults.results[i].id;
        setImdbLink(`${imdb_url}${imdbId}`);
        setHasImdb(true);
      }
    }
  };

  const handleExtendListItem = async () => {
    if (!hasExtended) {
      setWikiResult();
      setIMDBResult();
      setHasExtended(true);
    }
  };

  const handleRelatedMoviesButton = async () => {
    setLoading(true);

    const resultMovie = await fetchTMDBGetActorByMovie(movieID);
    const actorID = resultMovie.data.movie.cast[0].person.id;
    const resultMovies = await fetchTMDBDiscoverMovies(actorID);
    const relatedMovies = resultMovies.data.discoverMovies;

    let i = 0;
    while (i < relatedMovies.length && relatedMovies[i].name !== name) {
      i++;
    }

    if (i < relatedMovies.length) {
      let movie = relatedMovies[0];
      relatedMovies[0] = relatedMovies[i];
      relatedMovies[i] = movie;
    }
    setMovies(relatedMovies);
    setIsRelated(true);
    setLoading(false);
  };

  return (
    <ListItem onClick={handleExtendListItem} key={movieID} sx={listItemStyle}>
      <Accordion sx={accordionStyle}>
        <AccordionSummary
          id={`${movieID}-panel`}
          aria-controls={`${movieID}-header`}
          expandIcon={<ExpandMoreIcon sx={expandIconStyle} />}
        >
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src={validateImg(img)}
                sx={avatarStyle}
              />
            </ListItemAvatar>
          </ListItemIcon>
          <Stack direction="column" sx={accordionStackStyle}>
            <Typography variant="h5">{name}</Typography>
            <Typography sx={listTyphoBodyStyle} variant="body2">
              Score: {score}
            </Typography>
            <Typography sx={listTyphoBodyStyle} variant="body2">
              Release: {validateReleaseDate(releaseDate)}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={summaryBodyStyle} variant="body2">
            {overview}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
            sx={linkStackStyle}
          >
            {hasWiki ? (
              <Link
                target="_blank"
                underline="none"
                rel="noopener"
                href={wikiLink}
                sx={linkStyle}
              >
                Wikipedia
              </Link>
            ) : (
              ""
            )}
            {hasImdb ? (
              <Link
                target="_blank"
                underline="none"
                rel="noopener"
                href={imdbLink}
                sx={linkStyle}
              >
                IMDB
              </Link>
            ) : (
              ""
            )}
            <Button
              onClick={handleRelatedMoviesButton}
              variant="contained"
              color="error"
              size="small"
            >
              Related Movies
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
}

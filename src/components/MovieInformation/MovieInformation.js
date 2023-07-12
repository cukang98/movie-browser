import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBackIcon,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import "../global.css";
import genreIcons from "../../assets/assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/createGenreOrCategory";
import { MovieList } from "..";

const MovieInformation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: isErrorInRecommendations,
  } = useGetRecommendationsQuery({ list: `/recommendations`, movie_id: id });

  console.log(recommendations);

  if (isFetching || isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error || isErrorInRecommendations) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong go back</Link>
      </Box>
    );
  }

  return (
    <Grid container className="movieinfo--container--spacearound">
      <Grid
        item
        sm={12}
        lg={4}
        style={{ display: "flex", marginBottom: "30px" }}
      >
        <img
          className="movieinfo--poster"
          style={{ width: "100%", height:"90%" }}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h4" align="center" gutterBottom>
          {data?.title}({data.release_date.split("-")[0]})
        </Typography>
        <Grid className="movieinfo--container--spacearound">
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language : {data?.spoken_languages[0]?.name}
          </Typography>
        </Grid>
        <Grid item className="movieinfo--genres--container">
          {data?.genres?.map((genre, i) => (
            <Link
              key={genre.name}
              className="movieinfo--links"
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                className="movieinfo--genre-image"
                src={genreIcons[genre.name.toLowerCase()]}
                alt=""
                style={{ filter: "dark" }}
              />

              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2} style={{overflow:"auto", maxHeight:'100%'}} md={3}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className="movieinfo--cast--image"
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={`${character.name}`}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography
          variant="h5"
          color="textPrimary"
          gutterBottom
          align="center"
        >
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList
            key={id}
            movies={recommendations}
            numberOfMovies={
              recommendations.results.length < 12
                ? recommendations.results.length
                : 12
            }
          ></MovieList>
        ) : (
          <Box>Sorry, nothing was found!</Box>
        )}
      </Box>
      {console.log(id)}
      {console.log(data.videos.results[0].key)}
      <Modal
        closeAfterTransition
        className="movieinfo--modal"
        open={open}
        onClose={() => {
          setopen(false);
        }}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className="movieinfo--video"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            frameborder="0"
            title="trailer"
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;

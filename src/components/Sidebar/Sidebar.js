import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/createGenreOrCategory";
import "../global.css";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Logo =
  "https://fontmeme.com/permalink/230712/ca6ee6b0a8379e122f423ff2be2eb537.png";

const Sidebar = ({ setMobileOpen }) => {
  const { data, isFetching, error } = useGetGenresQuery();
  const dispatch = useDispatch();
  const genreIdOrCategoryName = useSelector(
    (state) => state.currentGenreOrCategory
  );
  // console.log(genreIdOrCategoryName)
  // console.log(data)

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className="sidebar-image-link">
        <img className="sidebar-image" src={Logo} alt="Filmpire Logo" />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>

        {categories.map(({ label, value }) => (
          <Link className="links" key={label} to="/">
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  className="genre-images"
                  src={genreIcons[label.toLowerCase()]}
                  alt=""
                  style={{
                    filter: "dark",
                  }}
                />
              </ListItemIcon>
              <Typography color="textPrimary">{label}</Typography>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box dislay="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link className="links" key={name} to="/">
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <img
                    className="genre-images"
                    src={genreIcons[name.toLowerCase()]}
                    alt=""
                    style={{
                      filter: "dark",
                    }}
                  />
                </ListItemIcon>
                <Typography color="textPrimary">{name}</Typography>
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;

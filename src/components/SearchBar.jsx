import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <Paper
      className="search-box"
      component="form"
      sx={{
        p: "4px 4px",
        display: "flex",
        alignItems: "center",
        borderRadius: "1000px",
        boxShadow: "none",
      }}
      xs={12}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontFamily: "Raleway" }}
        placeholder="Search Profiles"
        inputProps={{ "aria-label": "Search Profiles" }}
      />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

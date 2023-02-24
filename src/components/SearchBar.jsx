import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import * as profileService from "../services/profile";
import Joi from "joi";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchQuery, updatePage, setUpdatePage }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [displayResult, setDisplayResult] = useState([]);
  const [updateSearch, setUpdateSearch] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const clickLink = (username) => {
    navigate(`/profiles/${username}`);
    setUpdatePage(true);
  };

  useEffect(() => {
    profileService.searchUsers(form.searchQuery).then((response) => {
      setSearchResult(response.data);
      setUpdateSearch(false);
      setLoading(false);
      console.log(isLoading);
      console.log(searchResult);
    });
  }, [updateSearch]);

  const [form, setForm] = useState({
    searchQuery: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    searchQuery: Joi.string().required(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setUpdateSearch(true);
    handleClick(event);
  };

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
  };
  return (
    <Grid component="form" onSubmit={handleSubmit}>
      <Paper
        className="search-box"
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
          name="searchQuery"
          error={!!errors.searchQuery}
          helperText={errors.searchQuery}
          onChange={handleChange}
          value={form.searchQuery}
          sx={{ ml: 1, flex: 1, fontFamily: "Raleway" }}
          placeholder="Search Profiles"
          autoComplete="off"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "37%",
            maxWidth: "37%",
            minWidth: "470px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            marginTop: "5px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <div>
          {searchResult.length > 0 ? (
            <div>
              {!isLoading ? (
                searchResult.map((searchResult) => (
                  <MenuItem onClick={() => clickLink(searchResult.username)}>
                    <Avatar src={searchResult.profilePicture} />
                    <div
                      style={{
                        fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                        fontWeight: "700",
                        marginRight: "4px",
                      }}
                    >
                      {searchResult.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      {" "}
                      @ {searchResult.username}
                    </div>
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={handleClose}>
                  <div style={{ display: "grid", alignContent: "center" }}>
                    <div class="s-loader"></div>
                  </div>
                </MenuItem>
              )}
            </div>
          ) : (
            <div
              style={{
                fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                marginLeft: "5px",
                color: "grey",
              }}
            >
              No results
            </div>
          )}
        </div>
      </Menu>
    </Grid>
  );
};

export default SearchBar;

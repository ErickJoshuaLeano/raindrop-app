import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";

const NavBar = ({ onLogout }) => {
  const currentUser = authService.getCurrentUser();

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Grid className="navbar-grid" container xs={11} sm={10.5}>
        <Grid container xs={2} md={3}>
          <Grid item xs={12} md={3} lg={2}>
            <div className="logo-container">
              <img
                type="button"
                className="logo"
                src="images/logo.png"
                onClick={() => navigate("/")}
              />
            </div>
          </Grid>
          <Grid item md={9} sx={{ display: { xs: "none", md: "table-cell" } }}>
            <div className="app-name">RAINDROP</div>
          </Grid>
        </Grid>
        <Grid item xs={5} sm={5} md={4.5} lg={5.25}>
          <SearchBar />
        </Grid>
        <Grid className="icon-buttons" container xs={1} sm={2} md={2}>
          <Grid
            item
            sm={6}
            sx={{ display: { xs: "none", sm: "table-cell" } }}
            md={4}
          >
            <IconButton
              type="button"
              sx={{
                color: "#84e7b3",
              }}
            >
              <PersonRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <IconButton type="button" sx={{ color: "#84e7b3" }}>
              <NotificationsRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item md={4} sx={{ display: { xs: "none", md: "table-cell" } }}>
            <IconButton
              type="button"
              sx={{
                color: "#84e7b3",
              }}
            >
              <PublicRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <AccountMenu currentUser={currentUser} onLogout={onLogout} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </nav>
  );
};

export default NavBar;

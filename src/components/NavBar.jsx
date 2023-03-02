import React from "react";
import * as authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { Fade, Grid, useTheme, Dialog } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AccountMenu from "./AccountMenu";
import SearchBar from "./SearchBar";
import logo from "./logo.png";
import Iframe from "react-iframe";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const NavBar = ({
  onLogout,
  thisUser,
  updatePage,
  setUpdatePage,
  updatePicture,
  setUpdatePicture,
}) => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fade in timeout={1000} style={{ transitionDelay: "000ms" }}>
      <nav
        className="navbar"
        style={{ backgroundColor: theme.palette.mainColor.main }}
      >
        <Grid className="navbar-grid" container xs={11} sm={10.5}>
          <Grid container xs={2} md={3}>
            <Grid item xs={12} md={3} lg={2}>
              <div
                className="logo-container"
                style={{ backgroundColor: theme.palette.whitePrimary.main }}
              >
                <img
                  type="button"
                  className="logo"
                  src={logo}
                  onClick={() => navigate("/")}
                />
              </div>
            </Grid>
            <Grid
              item
              md={9}
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              <div className="app-name">RAINDROP</div>
            </Grid>
          </Grid>
          <Grid item xs={5} sm={5} md={4.5} lg={5.25}>
            <SearchBar updatePage={updatePage} setUpdatePage={setUpdatePage} />
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
                  color: theme.palette.notifIcons.main,
                }}
                onClick={() => navigate("/profiles/all")}
              >
                <PersonRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <IconButton
                type="button"
                sx={{ color: theme.palette.notifIcons.main }}
              >
                <NotificationsRoundedIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              md={4}
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              <IconButton
                onClick={handleClickOpen}
                type="button"
                sx={{
                  color: theme.palette.notifIcons.main,
                }}
              >
                <PublicRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <AccountMenu
              currentUser={currentUser}
              thisUser={thisUser}
              onLogout={onLogout}
              updatePicture={updatePicture}
              setUpdatePicture={setUpdatePicture}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Grid>
              {" "}
              <IconButton onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>{" "}
            </Grid>{" "}
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d146920.25163636237!2d121.00186552651797!3d14.612048817512678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1677574854212!5m2!1sen!2sph"
              width="600px"
              height="720px"
              id=""
              className=""
              display="block"
              position="relative"
            />
          </Dialog>
        </Grid>
      </nav>
    </Fade>
  );
};

export default NavBar;

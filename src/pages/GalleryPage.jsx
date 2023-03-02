import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth";
import * as postsService from "../services/posts";
import * as profilesService from "../services/profile";
import "./GalleryPage.css";
import {
  Button,
  Card,
  Dialog,
  Fade,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const GalleryPage = () => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [thisUser, setThisUser] = useState([]);
  const [updatePicture, setUpdatePicture] = useState(false);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
    window.location.reload(false);
    setLoading(false);
    setLoadingUser(false);
  };

  const myPhotos = myPosts.filter(
    (myPosts) => myPosts.postPicture !== null && myPosts.postPicture !== ""
  );
  useEffect(() => {
    profilesService.fetchCurrentUser().then((response) => {
      setThisUser(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  useEffect(() => {
    postsService.fetchPosts().then((response) => {
      setPosts(response.data);
      setLoading(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((posts) => {
        for (let i = 0; i < following.length; i++) {
          if (posts.user.id === following[i].followingId) {
            return true;
          }
        }
      })
    );
    setLoading(false);
  }, [posts, updatePage, thisUser]);

  useEffect(() => {
    profilesService
      .fetchPostsbyUsername(currentUser.username)
      .then((response) => {
        setMyPosts(response.data);
        setLoading(false);
      });
  }, [posts]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoadingUser || isLoading) {
    return (
      <div>
        <Fade in timeout={1000} style={{ transitionDelay: "800ms" }}>
          <div class="loader2">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </Fade>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div
        className="background"
        style={{ backgroundColor: theme.palette.background.main }}
      >
        <NavBar
          onLogout={handleLogout}
          thisUser={thisUser}
          updatePage={updatePage}
          setUpdatePage={setUpdatePage}
          theme={theme}
          updatePicture={updatePicture}
          setUpdatePicture={setUpdatePicture}
        />
        <div className="grid-container">
          <Grid container xs={12} className="column" justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Typography
                sx={{
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhotoSizeSelectActualIcon />
                <div style={{ width: "5px" }}></div>
                My Photos
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                sx={{
                  margin: "5px",
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "700",
                }}
                startIcon={<HomeIcon />}
                onClick={() => navigate(`/home`)}
              >
                Return to Home
              </Button>
              <Button
                sx={{
                  margin: "5px",
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "700",
                }}
                endIcon={<AccountCircleIcon />}
                onClick={() => navigate(`/profiles/${thisUser.username}`)}
              >
                Go to Profile
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Fade in timeout={1000} style={{ transitionDelay: "800ms" }}>
                <ImageList
                  xl={{ width: 500, height: 450 }}
                  cols={3}
                  rowHeight={300}
                  className="picList"
                  variant="quilted"
                >
                  {myPhotos.map((item) => (
                    <Card>
                      <ImageListItem key={item.postPicture}>
                        <img
                          type="button"
                          onClick={() => handleClickOpen()}
                          src={item.postPicture}
                        />
                      </ImageListItem>
                    </Card>
                  ))}
                </ImageList>
              </Fade>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

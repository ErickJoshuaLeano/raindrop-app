import {
  Grid,
  Avatar,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemAvatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as followingService from "../services/following";
import { styled, useTheme } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import GalleryCard from "../components/Home Page/GalleryCard";
import HomeProfileCard from "../components/Home Page/HomeProfileCard";
import PostCardDetails from "../components/Home Page/PostCardDetails";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import * as postsService from "../services/posts";
import * as profilesService from "../services/profile";
import * as likesService from "../services/likes";
import "./HomePages.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import HomeIcon from "@mui/icons-material/Home";
import { ToastContainer, toast } from "react-toastify";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const AllProfilesPage = () => {
  const theme = useTheme();
  const [thisUser, setThisUser] = useState([]);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
    window.location.reload(false);
    setLoading(false);
    setLoadingUser(false);
  };

  const handleAddFollower = (userId) => {
    followingService
      .addFollowing(userId)
      .then((response) => {
        // console.log(response);
        setUpdatePage(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message[0], {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const handleDeleteFollowing = async (id) => {
    try {
      await followingService.deleteFollowing(id);
      setUpdatePage(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Like has already been removed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handleRemoveFollowing = (user) => {
    handleDeleteFollowing(
      following.find((following) => following.followingId === user.id).id
    );
  };

  useEffect(() => {
    followingService.getFollowing().then((response) => {
      setFollowing(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  useEffect(() => {
    profilesService.fetchAllUsers().then((response) => {
      setUsers(response.data);
      setLoading(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  useEffect(() => {
    profilesService.fetchCurrentUser().then((response) => {
      setThisUser(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  if (isLoadingUser || isLoading) {
    return (
      <div class="loader2">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    );
  }

  return (
    <>
      <Fade in timeout={1000} style={{ transitionDelay: "200ms" }}>
        <div
          className="background"
          style={{ backgroundColor: theme.palette.background.main }}
        >
          <NavBar
            onLogout={handleLogout}
            thisUser={thisUser}
            updatePage={updatePage}
            setUpdatePage={setUpdatePage}
          />
          <div className="grid-container">
            <Grid
              className="grid"
              container
              xs={12}
              sm={11}
              md={10.5}
              sx={{ height: "100vh" }}
            >
              <Grid
                className="column"
                item={true}
                lg={3}
                xl={2.5}
                sx={{
                  height: "fit-content",
                  display: { xs: "none", lg: "table-cell" },
                }}
              ></Grid>
              <Grid className="column" item={true} xs={12} sm={8} lg={6} xl={6}>
                {" "}
                <List
                  sx={{
                    width: "95%",
                    backgroundColor: theme.palette.card.main,
                    borderRadius: "40px",
                    paddingBottom: "3vh",
                    boxShadow: "none",
                    margin: "0.5vw",
                    display: "grid",
                  }}
                >
                  {users.map((user) => (
                    <Grid xs={12} display="flex" alignItems="center">
                      <Grid item xs={10}>
                        <ListItem
                          alignItems="flex-start"
                          type="button"
                          onClick={() => navigate(`/profiles/${user.username}`)}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt="Remy Sharp"
                              src={user.profilePicture}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            disableTypography
                            sx={{
                              display: "inline",
                              fontFamily:
                                "Raleway, Arial, Helvetica, sans-serif",
                              fontWeight: "700",
                              fontSize: "18px",
                              color: theme.palette.mainText.main,
                            }}
                            primary={user.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{
                                    display: "flex",
                                    fontFamily:
                                      "Raleway, Arial, Helvetica, sans-serif",
                                    fontWeight: "500",
                                    color: theme.palette.mainText.light,
                                  }}
                                  variant="body2"
                                  color="grey"
                                >
                                  @{user.username}{" "}
                                  <div style={{ width: "20px" }}></div>
                                  <Typography
                                    sx={{
                                      display: "flex",
                                      fontFamily:
                                        "Raleway, Arial, Helvetica, sans-serif",
                                      fontWeight: "300",
                                      fontSize: "14px",
                                      color: theme.palette.mainText.light,
                                    }}
                                  >
                                    Joined on: {user.createdAt.substring(0, 10)}
                                  </Typography>
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </Grid>
                      <Grid item xs={2}>
                        {following.find(
                          (following) => following.followingId === user.id
                        ) ? (
                          <Grid item={true} xs={12}>
                            <Button
                              disableElevation
                              width="10vw"
                              variant="contained"
                              onClick={() => handleRemoveFollowing(user)}
                              sx={{
                                borderRadius: "1000px",
                                margin: "7px",
                                backgroundColor: "#1b8b97",
                                fontFamily:
                                  "Raleway, Arial, Helvetica, sans-serif",
                                fontWeight: "700",
                                padding: "5px",
                                "&:hover": { backgroundColor: "#074147" },
                              }}
                            >
                              <PersonRemoveIcon />
                            </Button>
                          </Grid>
                        ) : (
                          <Grid item={true} xs={12} sx={{}}>
                            <Button
                              disableElevation
                              variant="contained"
                              onClick={() => handleAddFollower(user.id)}
                              sx={{
                                borderRadius: "1000px",
                                margin: "7px",
                                backgroundColor: "grey",
                                fontFamily:
                                  "Raleway, Arial, Helvetica, sans-serif",
                                fontWeight: "700",
                                padding: "5px",
                                "&:hover": { backgroundColor: "#074147" },
                              }}
                            >
                              <PersonAddAlt1Icon />
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </List>
              </Grid>
              <Grid
                className="column"
                item={true}
                sm={4}
                lg={3}
                xl={2.5}
                sx={{
                  height: "100vh",
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                <Fade in timeout={1000} style={{ transitionDelay: "600ms" }}>
                  <Card
                    xs={12}
                    sx={{
                      borderRadius: "40px",
                      backgroundColor: "#27abb9",
                      boxShadow: "none",
                      margin: "0.5vw",
                      marginBlock: "1vw",
                    }}
                  >
                    {" "}
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/home"}
                    >
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          width: "94.5%",
                          borderRadius: "1000px",
                          margin: "7px",
                          backgroundColor: "#1b8b97",
                          fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                          fontWeight: "700",
                          padding: "5px",
                          "&:hover": { backgroundColor: "#074147" },
                        }}
                      >
                        <HomeIcon />
                        Return to Home
                      </Button>
                    </Link>
                  </Card>
                </Fade>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default AllProfilesPage;

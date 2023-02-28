import { Button, Card, Fade, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GalleryCard from "../components/Home Page/GalleryCard";
import PostCardGrid from "../components/Home Page/PostCardGrid";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import * as postsService from "../services/posts";
import * as profilesService from "../services/profile";
import Posts from "./Posts";
import "./ProfilePage.css";
import * as likesService from "../services/likes";
import * as followingService from "../services/following";
import CalendarWidget from "../components/Home Page/CalendarWidget";
import WeatherWidget from "../components/Home Page/WeatherWidget";
import NewsWidget from "../components/Home Page/NewsWidget";
import CoverCard from "../components/Profile Page/CoverCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const ProfilePage = () => {
  const theme = useTheme();
  const params = useParams();
  const currentUser = authService.getCurrentUser();

  const [thisUser, setThisUser] = useState([]);
  const [updatePicture, setUpdatePicture] = useState(false);
  const [following, setFollowing] = useState([]);
  const [otherUser, setOtherUser] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);

    navigate("/login");
    window.location.reload(false);
  };

  const handleAddLikePost = (postId) => {
    likesService
      .addPostLike(postId)
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

  useEffect(() => {
    followingService.getFollowing().then((response) => {
      setFollowing(response.data);
      setLoadingUser(false);
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

  useEffect(() => {
    profilesService.fetchUserbyUsername(params.username).then((response) => {
      setOtherUser(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  useEffect(() => {
    postsService.fetchPostsbyUsername(params.username).then((response) => {
      setPosts(response.data);
      setLoading(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  useEffect(() => {
    profilesService.fetchLikesbyUsername(params.username).then((response) => {
      setUserLikes(response.data);
    });
  }, [updatePage]);

  const handleSubmit = (post) => {
    postsService
      .addPost(post)
      .then((response) => {
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

  const handleSubmitComment = (comment, id) => {
    postsService
      .addComment(comment, id)
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

  const handleUpdateChanged = (id) => {
    const post = posts.find((post) => post.id === id);
    postsService.updatePost(id, post);
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
          };
        }
        return post;
      })
    );
  };

  const handleDeleteLike = async (id) => {
    try {
      await likesService.deleteLike(id);
      setUpdatePage(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Like has already been removed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handleDeletePost = async (id) => {
    const postsClone = [...posts];

    try {
      setPosts(posts.filter((post) => post.userId !== id));
      await postsService.deletePost(id);
      setUpdatePage(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Post has already been deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setPosts(postsClone);
    }
  };

  const handleEditUser = (form) => {
    profilesService
      .updateProfile(form)
      .then(() => {
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

  const handleRemoveFollowing = (otherUser) => {
    handleDeleteFollowing(
      following.find((following) => following.followingId === otherUser.id).id
    );
  };

  if (isLoadingUser || isLoading) {
    return (
      <div class="loader3">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    );
  }

  return (
    <>
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
          <Grid className="profilegrid" container xs={12} sm={11} md={10.5}>
            <Grid container lg={12} xl={11}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <CoverCard
                    onDeleteFollowing={handleDeleteFollowing}
                    onAddFollower={handleAddFollower}
                    setFollowing={setFollowing}
                    following={following}
                    posts={posts}
                    otherUser={otherUser}
                    onEditUser={handleEditUser}
                    userLikes={userLikes}
                    thisUser={thisUser}
                    isLoadingUser={isLoadingUser}
                    setLoadingUser={setLoadingUser}
                    currentUser={currentUser}
                    setUpdatePicture={setUpdatePicture}
                  />
                </Grid>
              </Grid>
              <Grid
                className="column2"
                item={true}
                lg={3}
                xl={2.3}
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                }}
              >
                <GalleryCard posts={posts} username={params.username} />
              </Grid>
              <Grid
                className="column2"
                container
                xs={12}
                sm={12}
                lg={9}
                xl={9.7}
              >
                <Fade in timeout={1000} style={{ transitionDelay: "300ms" }}>
                  {currentUser.username === params.username ? (
                    <Grid item={true} xs={12}>
                      <Posts onSubmit={handleSubmit} thisUser={thisUser} />
                    </Grid>
                  ) : following.find(
                      (following) => following.followingId === otherUser.id
                    ) ? (
                    <Grid item={true} xs={12}>
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
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleRemoveFollowing(otherUser)}
                          sx={{
                            width: "98%",
                            borderRadius: "1000px",
                            margin: "7px",
                            backgroundColor: "#1b8b97",
                            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                            fontWeight: "700",
                            padding: "5px",
                            "&:hover": { backgroundColor: "#074147" },
                          }}
                        >
                          <PersonRemoveIcon />
                          <div style={{ width: "15px" }}></div>
                          Unfollow
                        </Button>
                      </Card>
                    </Grid>
                  ) : (
                    <Grid item={true} xs={12} sx={{}}>
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
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleAddFollower(otherUser.id)}
                          sx={{
                            width: "98%",
                            borderRadius: "1000px",
                            margin: "7px",
                            backgroundColor: "#1b8b97",
                            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                            fontWeight: "700",
                            padding: "5px",
                            "&:hover": { backgroundColor: "#074147" },
                          }}
                        >
                          <PersonAddIcon />
                          <div style={{ width: "15px" }}></div> Follow
                        </Button>
                      </Card>
                    </Grid>
                  )}
                </Fade>

                <Grid item xs={12}>
                  <PostCardGrid
                    currentUser={currentUser}
                    posts={posts}
                    isLoading={isLoading}
                    onDeletePost={handleDeletePost}
                    onAddLikePost={handleAddLikePost}
                    onDeleteLike={handleDeleteLike}
                    onSubmitComment={handleSubmitComment}
                    updatePage={updatePage}
                    setUpdatePage={setUpdatePage}
                    columns={{ xs: 1, sm: 2 }}
                    onClick={
                      handleDeletePost ||
                      handleAddLikePost ||
                      handleDeleteLike ||
                      handleSubmitComment
                    }
                  />
                </Grid>
                <ToastContainer />
              </Grid>
            </Grid>
            <Grid
              item={true}
              xl={1}
              sx={{
                height: "100vh",
                display: { xs: "none", xl: "table-cell" },
              }}
            >
              {" "}
              <CalendarWidget />
              <WeatherWidget />
              <NewsWidget />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

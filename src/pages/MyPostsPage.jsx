import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth";
import * as postsService from "../services/posts";
import * as profilesService from "../services/profile";
import * as likesService from "../services/likes";
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
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostCard from "../components/Home Page/PostCard";
import { ToastContainer, toast } from "react-toastify";
import "./MyPostsPage.css";

export const MyPostsPage = () => {
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

  const handleDeletePost = async (id) => {
    const postsClone = [...posts];

    try {
      setPosts(posts.filter((post) => post.userId !== id));
      await postsService.deletePost(id);
      setUpdatePage(true);
      toast("Post has been removed", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Post has already been deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setPosts(postsClone);
    }
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
            <div class="inner one"></div>
            <div class="inner two"></div>
            <div class="inner three"></div>
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
          <Grid
            container
            xs={12}
            className="column-myposts"
            justifyContent="center"
          >
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
                My Posts
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
            <Grid item xs={12} sm={8} lg={6} xl={6} textAlign="left">
              {/* <Fade in timeout={1000} style={{ transitionDelay: "800ms" }}> */}
              {myPosts.map((post) => (
                <PostCard
                  currentUser={currentUser}
                  post={post}
                  key={post.id}
                  isLoading={isLoading}
                  onDeletePost={handleDeletePost}
                  onAddLikePost={handleAddLikePost}
                  onDeleteLike={handleDeleteLike}
                  onSubmitComment={handleSubmitComment}
                  updatPage={updatePage}
                  setUpdatePage={setUpdatePage}
                />
              ))}
              {/* </Fade> */}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

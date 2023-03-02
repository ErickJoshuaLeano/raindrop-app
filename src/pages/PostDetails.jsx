import { Grid, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
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
import "react-toastify/dist/ReactToastify.css";

const PostDetails = () => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [thisUser, setThisUser] = useState([]);
  const [updatePicture, setUpdatePicture] = useState(false);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [myLikes, setMyLikes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingPosts, setLoadingPosts] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
    window.location.reload(false);
    setLoading(false);
    setLoadingUser(false);
  };

  const handleAddLikePost = (postId) => {
    likesService
      .addPostLike(postId)
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

  useEffect(() => {
    profilesService.fetchCurrentUser().then((response) => {
      setThisUser(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  useEffect(() => {
    postsService.fetchPostsbyId(params.postId).then((response) => {
      setPosts(response.data);
      setLoading(false);
      setUpdatePage(false);
      setLoadingPosts(false);
    });
  }, [updatePage]);

  useEffect(() => {
    profilesService
      .fetchPostsbyUsername(currentUser.username)
      .then((response) => {
        setMyPosts(response.data);
        setLoading(false);
      });
  }, [posts]);

  useEffect(() => {
    profilesService
      .fetchLikesbyUsername(currentUser.username)
      .then((response) => {
        setMyLikes(response.data);
      });
  }, [posts]);

  const handleSubmitComment = (comment, id) => {
    postsService
      .addComment(comment, id)
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

  const handleDeletePost = async () => {
    try {
      await postsService.deletePost(params.postId);
      setUpdatePage(true);
      navigate("/home");
      toast("Post deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Post has already been deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
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

  if (isLoadingUser || isLoading) {
    return (
      <div className="loader2">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
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
          updatePicture={updatePicture}
          setUpdatePicture={setUpdatePicture}
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
            >
              <HomeProfileCard
                thisUser={thisUser}
                currentUser={currentUser}
                myPosts={myPosts}
                myLikes={myLikes}
                isLoading={isLoading}
                onEditUser={handleEditUser}
              />
            </Grid>
            <Grid className="column" item={true} xs={12} sm={8} lg={6} xl={6}>
              <PostCardDetails
                post={posts}
                currentUser={currentUser}
                key={posts.id}
                isLoadingPosts={isLoadingPosts}
                onDeletePost={handleDeletePost}
                onAddLikePost={handleAddLikePost}
                onDeleteLike={handleDeleteLike}
                onSubmitComment={handleSubmitComment}
                updatPage={updatePage}
                setUpdatePage={setUpdatePage}
                onClick={
                  handleDeletePost ||
                  handleAddLikePost ||
                  handleDeleteLike ||
                  handleSubmitComment
                }
              />
            </Grid>
            <ToastContainer />
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
              <div>
                {!isLoading ? (
                  <GalleryCard posts={posts} username={thisUser.username} />
                ) : (
                  <span className="loader"></span>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

import { Grid, Avatar, Divider, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import "react-toastify/dist/ReactToastify.css";
const PostDetails = ({ onAddLikePost }) => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [thisUser, setThisUser] = useState([]);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [myLikes, setMyLikes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [openComments, setOpenComments] = useState(false);

  const toggleOpenComments = () => {
    setOpenComments((value) => !value);
  };

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
        // console.log(response);
        setUpdatePage(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message[0]);
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

  const handleSubmit = (post) => {
    postsService
      .addPost(post)
      .then((response) => {
        // console.log(response);
        setUpdatePage(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message[0]);
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
          alert(error.response.data.message[0]);
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

  const handleLikePost = () => {
    onAddLikePost(posts.id);
  };

  const handleDeleteLike = async (id) => {
    try {
      await likesService.deleteLike(id);
      setUpdatePage(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Like has already been removed");
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
        alert("Post has already been deleted");
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
          alert(error.response.data.message[0]);
        }
      });
  };

  if (isLoadingUser || isLoading) {
    return (
      <div class="loader2">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    );
  }

  function time_ago(time) {
    switch (typeof time) {
      case "number":
        break;
      case "string":
        time = +new Date(time);
        break;
      case "object":
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, "s", 1], // 60
      [120, "1 m ago", "1 m from now"], // 60*2
      [3600, "m", 60], // 60*60, 60
      [7200, "1 h ago", "1 h from now"], // 60*60*2
      [86400, "h", 3600], // 60*60*24, 60*60
      [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
      [604800, "d", 86400], // 60*60*24*7, 60*60*24
      [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
      [2419200, "w", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "Last mth", "Next mth"], // 60*60*24*7*4*2
      [29030400, "mth", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Last yr", "Next yr"], // 60*60*24*7*4*12*2
      [2903040000, "yrs", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
      [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = "ago",
      list_choice = 1;

    if (seconds == 0) {
      return "Just now";
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = "from now";
      list_choice = 2;
    }
    var i = 0,
      format;
    while ((format = time_formats[i++]))
      if (seconds < format[0]) {
        if (typeof format[2] == "string") return format[list_choice];
        else
          return (
            Math.floor(seconds / format[2]) + " " + format[1] + " " + token
          );
      }
    return time;
  }
  const ColorButton = styled(Button)(({ theme }) => ({
    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
    fontSize: "16px",
    color: "#074147",
  }));

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
                isLoading={isLoading}
                onDeletePost={handleDeletePost}
                onAddLikePost={handleAddLikePost}
                onDeleteLike={handleDeleteLike}
                onSubmitComment={handleSubmitComment}
                updatPage={updatePage}
                setUpdatePage={setUpdatePage}
              />
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
              <div>
                {!isLoading ? (
                  <GalleryCard posts={posts} username={thisUser.username} />
                ) : (
                  <span class="loader"></span>
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

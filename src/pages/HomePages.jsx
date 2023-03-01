import { Grid } from "@mui/material";
import { red } from "material-ui-colors";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AddPost from "../components/Home Page/AddPost";
import CalendarWidget from "../components/Home Page/CalendarWidget";
import GalleryCard from "../components/Home Page/GalleryCard";
import HomeProfileCard from "../components/Home Page/HomeProfileCard";
import PostCard from "../components/Home Page/PostCard";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import * as postsService from "../services/posts";
import * as profilesService from "../services/profile";
import * as likesService from "../services/likes";
import PostDetails from "./PostDetails";

import "./HomePages.css";
import PostCardGrid from "../components/Home Page/PostCardGrid";
import Posts from "./Posts";
import CommentModule from "../components/Home Page/CommentModule";
import RaindropCards from "../components/Home Page/RaindropCards";
import LatestCard from "../components/Home Page/LatestCard";
import AllProfilesCard from "../components/Home Page/AllProfilesCard";
import AllPhotoGalleryCard from "../components/Home Page/AllPhotoGalleryCard";
import WeatherWidget from "../components/Home Page/WeatherWidget";
import NewsWidget from "../components/Home Page/NewsWidget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";
import * as followingService from "../services/following";

const HomePages = () => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [thisUser, setThisUser] = useState([]);
  const [updatePicture, setUpdatePicture] = useState(false);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [myLikes, setMyLikes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();

  if (following.length === 0) {
    followingService
      .addFollowing(currentUser.id)
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
  }

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
          toast(error.response.data.message[0], {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  useEffect(() => {
    followingService.getFollowing().then((response) => {
      setFollowing(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage, thisUser]);

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
        // console.log("test");
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
      <div class="loader2">
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
          <Grid
            className="grid"
            container
            xs={12}
            sm={11}
            md={10.5}
            sx={{
              height: "100vh",
            }}
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
                setUpdatePicture={setUpdatePicture}
              />
              <div>
                {!isLoading ? (
                  <GalleryCard posts={posts} username={thisUser.username} />
                ) : (
                  <span class="loader"></span>
                )}
              </div>
            </Grid>
            <Grid className="column" item={true} xs={12} sm={8} lg={6} xl={6}>
              <Posts onSubmit={handleSubmit} thisUser={thisUser} />
              <RaindropCards
                posts={filteredPosts}
                updatePage={updatePage}
                setUpdatePage={setUpdatePage}
              />
              <PostCardGrid
                currentUser={currentUser}
                posts={filteredPosts}
                isLoading={isLoading}
                onDeletePost={handleDeletePost}
                onAddLikePost={handleAddLikePost}
                onDeleteLike={handleDeleteLike}
                onSubmitComment={handleSubmitComment}
                updatePage={updatePage}
                setUpdatePage={setUpdatePage}
                columns={1}
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
              <LatestCard posts={filteredPosts} isLoading={isLoading} />
              <AllProfilesCard />
              <AllPhotoGalleryCard posts={filteredPosts} />
            </Grid>
            <Grid
              item={true}
              xl={1}
              sx={{
                height: "100vh",
                display: { xs: "none", xl: "table-cell" },
              }}
            >
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

export default HomePages;

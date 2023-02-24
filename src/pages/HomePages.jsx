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
import AddPost from "./AddPost";

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

const HomePages = () => {
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
        console.log(response);
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
    postsService.fetchPosts().then((response) => {
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
        console.log(response);
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
        console.log(response);
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

  const handleDeletePost = async (id) => {
    const postsClone = [...posts];

    try {
      setPosts(posts.filter((post) => post.userId !== id));
      await postsService.deletePost(id);
      setUpdatePage(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Post has already been deleted");
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

  return (
    <>
      <div className="background">
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
              {/* <PostDetails
                onDeletePost={handleDeletePost}
                onUpdateChanged={handleUpdateChanged}
                posts={posts}
              /> */}
              <RaindropCards
                posts={posts}
                updatePage={updatePage}
                setUpdatePage={setUpdatePage}
              />
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
                columns={1}
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
              <LatestCard posts={posts} />
              <AllProfilesCard />
              <AllPhotoGalleryCard posts={posts} />
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

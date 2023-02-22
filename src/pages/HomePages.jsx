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
import PostDetails from "./PostDetails";
import AddPost from "./AddPost";

import "./HomePages.css";
import PostCardGrid from "../components/Home Page/PostCardGrid";

const HomePages = () => {
  const currentUser = authService.getCurrentUser();
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [myLikes, setMyLikes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    window.location.reload(false);
    navigate("/login");
  };

  useEffect(() => {
    postsService.fetchPosts().then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, [posts]);

  useEffect(() => {
    profilesService
      .fetchPostsbyUsername(currentUser.username)
      .then((response) => {
        setMyPosts(response.data);
        setLoading(false);
      });
  }, [myPosts]);

  useEffect(() => {
    profilesService
      .fetchLikesbyUsername(currentUser.username)
      .then((response) => {
        setMyLikes(response.data);
        setLoading(false);
      });
  }, [myLikes]);

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

  const handleDeletePost = async (id) => {
    const postsClone = [...posts];

    try {
      setPosts(posts.filter((post) => post.userId !== id));
      await postsService.deletePost(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Not the user post,can't delete");
      }
      setPosts(postsClone);
    }
  };

  return (
    <>
      <div className="background">
        <NavBar onLogout={handleLogout} />
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
              className="column1"
              item={true}
              lg={3}
              xl={2.5}
              sx={{
                height: "fit-content",
                display: { xs: "none", lg: "table-cell" },
              }}
            >
              <HomeProfileCard
                currentUser={currentUser}
                myPosts={myPosts}
                myLikes={myLikes}
                isLoading={isLoading}
              />
              <GalleryCard posts={posts} />
            </Grid>
            <Grid className="column1" item={true} xs={12} sm={8} lg={6} xl={6}>
              <AddPost />
              {/* <PostDetails
                onDeletePost={handleDeletePost}
                onUpdateChanged={handleUpdateChanged}
                posts={posts}
              /> */}

              <PostCardGrid posts={posts} isLoading={isLoading} />
            </Grid>
            <Grid
              item={true}
              sm={4}
              lg={3}
              xl={2.5}
              sx={{
                backgroundColor: "blue",
                height: "100vh",
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              TEST
            </Grid>
            <Grid
              item={true}
              xl={1}
              sx={{
                backgroundColor: "yellow",
                height: "100vh",
                display: { xs: "none", xl: "table-cell" },
              }}
            >
              <CalendarWidget />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default HomePages;

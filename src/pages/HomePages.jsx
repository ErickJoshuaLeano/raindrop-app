import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";
import * as postService from "../services/post";
import AddPost from "./AddPost";

const HomePages = () => {
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const username = currentUser.username;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postService.fetchPostsbyUsername(username).then((response) => {
      setPosts(response.data);
    });
  }, [username]);

  const handleUpdateChanged = (id) => {
    const post = posts.find((post) => post.id === id);
    postService.updatePost(id, post);
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
      await postService.deletePost(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Not the user post,can't delete");
      }
      setPosts(postsClone);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    window.location.reload(false);
    navigate("/login");
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Grid container spacing={2} justifyContent="flex-end" textAlign="right">
        <Grid item xs={4}></Grid>
        <Grid item xs={12}>
          <PostDetails
            onDeletePost={handleDeletePost}
            onUpdateChanged={handleUpdateChanged}
            posts={posts}
          />
        </Grid>
        <br></br>
        <AddPost></AddPost>
      </Grid>
    </>
  );
};

export default HomePages;

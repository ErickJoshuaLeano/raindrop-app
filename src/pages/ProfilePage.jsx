import { Grid } from "@mui/material";
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

const ProfilePage = () => {
  const params = useParams();
  const currentUser = authService.getCurrentUser();
  const otherUser = profilesService.fetchOtherUser();
  const [thisUser, setThisUser] = useState([]);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    window.location.reload(false);
    navigate("/login");
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
    postsService.fetchPostsbyUsername(params.username).then((response) => {
      setPosts(response.data);
      setLoading(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

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
      <div class="loader3">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    );
  }

  return (
    <>
      <div className="background">
        <NavBar onLogout={handleLogout} thisUser={thisUser} />
        <div className="grid-container">
          <Grid className="grid" container xs={12} sm={11} md={10.5}>
            <Grid container lg={12} xl={11}>
              <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: "black",
                  height: "30vh",
                }}
              ></Grid>
              <Grid
                className="column2"
                item={true}
                lg={3}
                xl={2.3}
                sx={{
                  display: { xs: "none", lg: "table-cell", maxHeight: "60vh" },
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
                sx={{
                  height: "70vh",
                  maxHeight: "70vh",
                }}
              >
                <Grid
                  item={true}
                  xs={12}
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  <div>
                    {thisUser.username === params.username ? (
                      <Posts onSubmit={handleSubmit} thisUser={thisUser} />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Grid>
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
                    columns={2}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              xl={1}
              sx={{
                backgroundColor: "yellow",
                height: "100vh",
                display: { xs: "none", xl: "table-cell" },
              }}
            ></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

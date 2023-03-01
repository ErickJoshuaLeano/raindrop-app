import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth";
import * as postsService from "../services/posts";
import * as profilesService from "../services/profile";
import "./GalleryPage.css";
import { Fade, useTheme } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const GalleryPage = () => {
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
      {/* <Fade in timeout={1000} style={{ transitionDelay: "500ms" }}> */}
      <NavBar
        onLogout={handleLogout}
        thisUser={thisUser}
        updatePage={updatePage}
        setUpdatePage={setUpdatePage}
        theme={theme}
        updatePicture={updatePicture}
        setUpdatePicture={setUpdatePicture}
      />
      <ImageList
        xl={{ width: 500, height: 450 }}
        cols={3}
        rowHeight={300}
        className="picList"
        variant="quilted"
      >
        {myPhotos.map((item) => (
          <ImageListItem key={item.postPicture}>
            <img src={item.postPicture} />
          </ImageListItem>
        ))}
      </ImageList>
      {/* </Fade> */}
    </>
  );
};

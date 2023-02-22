import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import { Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Button } from "@mui/material";
import Spinner from "../experimental/Spinner"
import LoadingOverlay from 'react-loading-overlay-ts';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCommentIcon from '@mui/icons-material/AddComment';

const HomePages = () => {
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    window.location.reload(false);
    navigate("/login");
  };

  let [loading, setLoading] = useState(false);

  function handleNotFound() {
    navigate("/not-found");
  }

  function handleComment() {
    navigate("/postdetails");
  }

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <div>TEST</div>
      {/* trial */}
      <Grid container component="form" justifyContent="center">
      <div class="container">
        <div class="wrapper">
          <section class="post">
            {/* <header>Create Post</header> */}
            <form action="#">
              <div class="content">
                <AccountCircleIcon/>
                <div class="details">
                  <p> Post Title</p>
                </div>
              </div>
              <textarea
                placeholder="This is the content of this post"
                spellcheck="false"
                required
              ></textarea>
              <div class="options">
                {/* <p>Add to Your Post</p> */}
                <ul class="list">
                  {/* <li>
                    <CollectionsIcon />
                  </li> */}
                </ul>
              </div>

              <Button onClick={() => setLoading(!loading)}>
              <LoadingOverlay 
              active={loading}
              spinner={<Spinner />}
              fadeSpeed={500}
              text="Loading your content...">
              </LoadingOverlay>
              spin</Button>
              
              <IconButton onClick={handleNotFound}>
                  not found
              </IconButton>

              <IconButton onClick={handleComment}>
                  <AddCommentIcon/>
              </IconButton>
            </form>
          </section>
        </div>
      </div>
    </Grid>
    </>
  );
};

export default HomePages;

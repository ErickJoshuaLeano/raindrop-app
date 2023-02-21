import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import "./HomePages.css";

const HomePages = () => {
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    window.location.reload(false);
    navigate("/login");
  };

  return (
    <>
      <div class="background">
        <NavBar onLogout={handleLogout} />
        <div className="grid-container">
          <Grid
            className="grid"
            container
            xs={12}
            sm={11}
            md={10.5}
            sx={{ backgroundColor: "black", height: "100vh" }}
          >
            <Grid
              lg={3}
              xl={2.5}
              sx={{
                backgroundColor: "red",
                height: "100vh",
                display: { xs: "none", lg: "table-cell" },
              }}
            >
              TEST
            </Grid>
            <Grid
              xs={12}
              sm={8}
              lg={6}
              xl={6}
              sx={{
                backgroundColor: "green",
                height: "100vh",
              }}
            >
              TEST
            </Grid>
            <Grid
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
              xl={1}
              sx={{
                backgroundColor: "yellow",
                height: "100vh",
                display: { xs: "none", xl: "table-cell" },
              }}
            >
              TEST
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default HomePages;

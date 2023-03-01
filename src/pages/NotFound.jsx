import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import "./HomePages.css";
import { useTheme } from "@mui/material/styles";
import * as profilesService from "../services/profile";

const NotFound = () => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [thisUser, setThisUser] = useState([]);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    profilesService.fetchCurrentUser().then((response) => {
      setThisUser(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
    window.location.reload(false);
    setLoading(false);
    setLoadingUser(false);
  };

  if (accessToken == null) {
    return (
      <>
        <div class="drop-container">
          <h1>PAGE NOT FOUND</h1>
          <div class="drop"></div>
        </div>
      </>
    );
  } else {
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
        </div>
        <div class="drop-container">
          <h1>PAGE NOT FOUND</h1>
          <div class="drop"></div>
        </div>
      </>
    );
  }
};

export default NotFound;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";

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
      <NavBar onLogout={handleLogout} />
      <div>TEST</div>
    </>
  );
};

export default HomePages;

import React from "react";
import NavBar from "../components/NavBar";
import * as authService from "./services/auth";

const HomePages = () => {
  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
    </>
  );
};

export default HomePages;

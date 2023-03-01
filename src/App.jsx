import { Container, CssBaseline, FormGroup } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePages from "./pages/HomePages";
import * as authService from "./services/auth";
import "../src/App.css";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "./components/MaterialUISwitch";
import ProfilePage from "./pages/ProfilePage";
import DebugPage from "./pages/DebugPage";
import PostDetails from "./pages/PostDetails";
import AllProfilesPage from "./pages/AllProfilesPage";
import EditUserPage from "./pages/EditUserPage";
import { GalleryPage } from "./pages/GalleryPage";

function App() {
  const navigate = useNavigate();
  const { palette } = createTheme();
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());

  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const light = createTheme({
    palette: {
      primary: {
        main: "#27abb9",
      },
      mainColor: palette.augmentColor({ color: { main: "#27abb9" } }),
      card: palette.augmentColor({ color: { main: "#ffffff" } }),
      background: palette.augmentColor({ color: { main: "#eaebef" } }),
      whitePrimary: palette.augmentColor({ color: { main: "#ffffff" } }),
      postRaindrop: palette.augmentColor({ color: { main: "#74dfea" } }),
      notifIcons: palette.augmentColor({ color: { main: "#84e7b3" } }),
      darkAccents: palette.augmentColor({ color: { main: "#cecece" } }),
      postAccent: palette.augmentColor({
        color: { main: "#074147", light: "#84e7b3", text: "#074147" },
      }),
      postButton: palette.augmentColor({
        color: { main: "#84e7b3", text: "#074147" },
      }),
      profileHolder: palette.augmentColor({
        color: { main: "#74dfea", light: "#ffffff" },
      }),
      profileHolderPost: palette.augmentColor({
        color: { main: "#74dfea", light: "#27abb9" },
      }),
      viewProfile: palette.augmentColor({
        color: { main: "#1b8b97", light: "#074147", text: "#ffffff" },
      }),
      mainText: palette.augmentColor({
        color: { main: "#074147", light: "#000000" },
      }),
      galleryFiller: palette.augmentColor({
        color: { main: "#74dfea", light: "#84e7b3" },
      }),
      mode: "light",
    },
  });

  const dark = createTheme({
    palette: {
      primary: {
        main: "#074147",
      },
      mainColor: palette.augmentColor({ color: { main: "#074147" } }),
      card: palette.augmentColor({ color: { main: "#1a1c20" } }),
      background: palette.augmentColor({ color: { main: "#0f0e13" } }),
      whitePrimary: palette.augmentColor({ color: { main: "#0f0e13" } }),
      notifIcons: palette.augmentColor({ color: { main: "#0f0e13" } }),
      postRaindrop: palette.augmentColor({ color: { main: "#74dfea" } }),
      darkAccents: palette.augmentColor({ color: { main: "#1c1e21" } }),
      postAccent: palette.augmentColor({
        color: { main: "#74dfea", light: "#74dfea", text: "#ffffff" },
      }),
      postButton: palette.augmentColor({
        color: { main: "#27abb9", text: "#073135" },
      }),
      profileHolder: palette.augmentColor({
        color: { main: "#27abb9", light: "#74dfea" },
      }),
      profileHolderPost: palette.augmentColor({
        color: { main: "#074147", light: "#074147" },
      }),
      viewProfile: palette.augmentColor({
        color: { main: "#073135", light: "#042124", text: "#ffffff" },
      }),
      mainText: palette.augmentColor({
        color: { main: "#ffffff", light: "#bebebe" },
      }),
      galleryFiller: palette.augmentColor({
        color: { main: "#073135", light: "#074147" },
      }),
      mode: "dark",
    },
  });

  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem("isDarkTheme")) || false
  );
  const [isLightTheme, setIsLightTheme] = useState(
    JSON.parse(localStorage.getItem("isLightTheme")) || false
  );

  const changeTheme = () => {
    localStorage.setItem("isDarkTheme", !isDarkTheme);
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("isLightTheme", !isLightTheme);
    setIsLightTheme(!isLightTheme);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          className="toggle-button"
          control={
            <MaterialUISwitch
              checked={prefersDarkMode !== isDarkTheme}
              onChange={changeTheme}
            />
          }
        />
      </FormGroup>
      <ThemeProvider
        theme={
          prefersDarkMode
            ? isLightTheme
              ? createTheme(light)
              : createTheme(dark)
            : isDarkTheme
            ? createTheme(dark)
            : createTheme(light)
        }
      >
        <CssBaseline />
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                accessToken ? <HomePages /> : <Navigate to="/register" />
              }
            />
            <Route
              path="/register"
              element={accessToken ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/postdetails/:postId"
              element={accessToken ? <PostDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                accessToken ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />{" "}
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/profile/edit" element={<EditUserPage />} />
            <Route path="/profiles/:username" element={<ProfilePage />} />
            <Route path="/profiles/all" element={<AllProfilesPage />} />
            <Route path="/debug" element={<DebugPage />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;

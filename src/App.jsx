import { Container, CssBaseline, FormGroup } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePages from "./pages/HomePages";
import * as authService from "./services/auth";
import "../src/App.css";
import React, { useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "./components/MaterialUISwitch";

function App() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(authService.getAccessToken());

  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      // console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };
  // System Preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme1 = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  // Dark mode
  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });
  // LightMode
  const light = createTheme({
    palette: {
      mode: "light",
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
              path="/login"
              element={
                accessToken ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />

            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;

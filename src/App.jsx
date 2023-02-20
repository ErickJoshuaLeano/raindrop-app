import { Container, CssBaseline } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePages from "./pages/HomePages";
import * as authService from "./services/auth";
import "../src/App.css";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = React.useState(
    authService.getAccessToken()
  );

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

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // System Preference
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  // Dark mode
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  // LightMode
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ marginTop: 3 }}>
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

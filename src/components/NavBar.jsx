import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as authService from "../services/auth";
import { useNavigate } from "react-router-dom";

const NavBar = ({ onLogout }) => {
  const currentUser = authService.getCurrentUser();

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Raindrop
          </Typography>
          <div>
            {currentUser ? (
              <>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ marginRight: 2 }}
                >
                  Welcome {currentUser.username}
                </Typography>
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Typography>Logging out...</Typography>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

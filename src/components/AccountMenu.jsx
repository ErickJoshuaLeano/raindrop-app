import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

export default function AccountMenu({ currentUser, thisUser, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          height: "7vh",
          maxHeight: "47px",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div>
              {thisUser.profilePicture ? (
                <>
                  <Avatar
                    sx={{
                      height: "7vh",
                      width: "7vh",
                      maxHeight: "47px",
                      maxWidth: "47px",
                      border: "solid",
                      borderWidth: 2,
                      bordercolor: "white",
                    }}
                  >
                    <img
                      className="profile-picture3"
                      src={thisUser.profilePicture}
                      style={{ width: "50px" }}
                    />
                  </Avatar>
                </>
              ) : (
                <>
                  <Avatar
                    sx={{
                      height: "7vh",
                      width: "7vh",
                      maxHeight: "47px",
                      maxWidth: "47px",
                      border: "solid",
                      borderWidth: 2,
                      bordercolor: "white",
                      backgroundColor: "#1b8b97",
                    }}
                  >
                    {currentUser.name.substring(0, 1)}
                  </Avatar>
                </>
              )}
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            paddingBottom: 3,
            overflow: "visible",
            // filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            borderRadius: "40px",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: "48%",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Typography
          textAlign="center"
          fontFamily="Raleway, Arial, Helvetica, sans-serif"
        >
          Account Settings
        </Typography>

        <MenuItem
          onClick={() => navigate(`/profiles/${thisUser.username}`)}
          fontFamily="Raleway, Arial, Helvetica, sans-serif"
        >
          <Avatar />
          <Typography
            textAlign="center"
            fontFamily="Raleway, Arial, Helvetica, sans-serif"
          >
            Profile
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Avatar />{" "}
          <Typography
            textAlign="center"
            fontFamily="Raleway, Arial, Helvetica, sans-serif"
          >
            My Account
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="Raleway, Arial, Helvetica, sans-serif"
          >
            Add another account
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="Raleway, Arial, Helvetica, sans-serif"
          >
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="Raleway, Arial, Helvetica, sans-serif"
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

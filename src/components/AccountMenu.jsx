import * as React from "react";
import * as authService from "../services/auth";
import * as profilesService from "../services/profile";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "./AccountMenu.css";

export default function AccountMenu({
  onLogout,
  updatePicture,
  setUpdatePicture,
}) {
  const currentUser = authService.getCurrentUser();
  const [thisUser, setThisUser] = React.useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    profilesService.fetchCurrentUser().then((response) => {
      setThisUser(response.data);
      setUpdatePicture(false);
      setLoading(false);
    });
  }, [updatePicture]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateAway = () => {
    navigate(`/profiles/${currentUser.username}`);
    window.location.reload(false);
  };

  if (isLoading) {
    return <div className="loader-acc"></div>;
  }

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
                      style={{
                        height: "7vh",
                        width: "7vh",
                        maxHeight: "47px",
                        maxWidth: "47px",
                        objectFit: "cover",
                      }}
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
          elevation: 2,
          sx: {
            width: "250px",
            paddingBottom: 3,
            overflow: "visible",
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
          onClick={() => navigateAway()}
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
        <Divider />
        <MenuItem onClick={() => navigate("/profile/edit")}>
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

import {
  Avatar,
  Divider,
  Fade,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  TextField,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { ReactComponent as RaindropIcon } from "../Raindrop.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Joi from "joi";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

const ProfileHolder = ({ thisUser, onEditUser, setUpdatePicture }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setForm({ profilePicture: "" });
    setErrors({});
  };

  const [form, setForm] = useState({
    profilePicture: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    profilePicture: Joi.string().uri().allow("").optional(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newdata = { ...thisUser, profilePicture: form.profilePicture };
    onEditUser(newdata);
    setOpen(false);
    setUpdatePicture(true);
    form.profilePicture = "";
  };

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
  };

  return (
    <div className="profile-holder">
      <div className="layer1">
        <RaindropIcon
          className="raindrop"
          style={{ "--color": theme.palette.profileHolder.main }}
        ></RaindropIcon>
      </div>
      <div className="layer2">
        {" "}
        {thisUser.profilePicture && thisUser.profilePicture !== "" ? (
          <Avatar
            type="button"
            onClick={handleClickMenu}
            sx={{
              height: "85px",
              width: "85px",
              border: "solid",
              borderColor: theme.palette.profileHolder.light,
              borderWidth: 5,
              textJustify: "center",
              "&:hover": { backgroundColor: "#074147", transition: "0.5s" },
            }}
          >
            {" "}
            <img
              className="profile-picture-card"
              src={thisUser.profilePicture}
            />{" "}
          </Avatar>
        ) : (
          <Avatar
            type="button"
            onClick={handleClick}
            sx={{
              height: "85px",
              width: "85px",
              border: "solid",
              borderWidth: 5,
              borderColor: theme.palette.profileHolder.light,
              textJustify: "center",
              "&:hover": { backgroundColor: "#074147", transition: "0.5s" },
            }}
          >
            <div
              style={{
                fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                fontWeight: "100",
                textAlign: "center",
              }}
            >
              Upload Photo
            </div>{" "}
          </Avatar>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
          >
            <InsertPhotoOutlinedIcon /> Upload Profile Photo
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            >
              Insert Image URL
            </DialogContentText>
            <TextField
              name="profilePicture"
              error={!!errors.profilePicture}
              helperText={errors.profilePicture}
              onChange={handleChange}
              value={form.profilePicture}
              autoFocus
              margin="dense"
              id="name"
              label="Image Address"
              fullWidth
              variant="standard"
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancel}
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            >
              Cancel
            </Button>
            <Button
              disabled={isFormInvalid()}
              onClick={handleSubmit}
              type="submit"
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openMenu}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              ml: 1.5,
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
                top: 45,
                left: -5,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClick}>Change Profile Picture</MenuItem>
          <MenuItem onClick={() => navigate(`/profiles/${thisUser.username}`)}>
            Visit Profile
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ProfileHolder;

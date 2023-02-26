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

const ProfileHolderRegister = ({ setProfilePicture }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
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
    setProfilePicture(null);
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
    setProfilePicture(form.profilePicture);
    setOpen(false);
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
        {form.profilePicture !== "" ? (
          <Avatar
            type="button"
            onClick={handleClick}
            sx={{
              height: "85px",
              width: "85px",
              border: "solid",
              borderWidth: 5,
              bordercolor: "white",
              textJustify: "center",
              "&:hover": { backgroundColor: "#074147", transition: "0.5s" },
            }}
          >
            {" "}
            <img
              className="profile-picture-card"
              src={form.profilePicture}
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
              bordercolor: "white",
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
      </div>
    </div>
  );
};

export default ProfileHolderRegister;

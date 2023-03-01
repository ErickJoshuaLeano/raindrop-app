import "./ProfileHolderCover.css";
import { TextField, useTheme } from "@mui/material";
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

const ProfileHolderCover = ({
  otherUser,
  onEditUser,
  thisUser,
  currentUser,
  setUpdatePicture,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    form.coverPicture = "";
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
    const newdata = { ...otherUser, profilePicture: form.profilePicture };
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
    <div className="profile-holder-cover">
      <div className="layer1-cover">
        <RaindropIcon
          className="raindrop-cover"
          style={{ "--color": theme.palette.profileHolder.main }}
        ></RaindropIcon>
      </div>
      <div className="layer2-cover">
        {otherUser.profilePicture && otherUser.profilePicture !== "" ? (
          <img
            type="button"
            onClick={handleClickOpen}
            className="profile-picture-card-cover"
            src={otherUser.profilePicture}
            style={{ borderColor: theme.palette.profileHolder.light }}
          />
        ) : (
          <div
            className="profile-picture-card-cover"
            style={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "100",
              textAlign: "center",
            }}
          >
            {otherUser.username === thisUser.username
              ? "Add Photo"
              : "No Profile Photo"}
          </div>
        )}
        {otherUser.username === currentUser.username ? (
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
        ) : (
          <Dialog open={open} onClose={handleClose}>
            <img className="img-dialogue" src={otherUser.profilePicture} />
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ProfileHolderCover;

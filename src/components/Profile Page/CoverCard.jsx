import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Divider,
  Grid,
  MenuItem,
  MenuList,
  Typography,
  TextField,
  Fade,
} from "@mui/material";
import Button from "@mui/material/Button";
import Joi from "joi";
import React, { useState } from "react";
import ProfileHolder from "../Home Page/ProfileHolder";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { useNavigate } from "react-router-dom";
import "./CoverCard.css";
import ProfileHolderCover from "./ProfileHolderCover";

const CoverCard = ({ otherUser, onEditUser, userLikes, posts, thisUser }) => {
  const [form, setForm] = useState({
    coverPicture: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    coverPicture: Joi.string().uri().allow("").optional(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newdata = { ...otherUser, coverPicture: form.coverPicture };
    onEditUser(newdata);
    setOpen(false);
    form.coverPicture = "";
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

  return (
    <Fade in timeout={1000} style={{ transitionDelay: "000ms" }}>
      <Card
        xs={12}
        sx={{
          borderRadius: "40px",
          backgroundColor: "#27abb9",
          boxShadow: "none",
          margin: "0.5vw",
          marginBlock: "1vw",
        }}
      >
        <Grid container component="form" onSubmit={handleSubmit}>
          <Grid
            item
            md={3}
            sx={{
              display: { xs: "none", md: "table-cell" },
              marginTop: "50px",
            }}
          >
            <Divider variant="middle" sx={{ color: "white" }} />
            <CardContent>
              <Grid
                container
                xs={12}
                sx={{
                  display: "flex",
                  justifyItems: "center",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    color: "white",
                    display: "grid",
                    justifyItems: "center",
                  }}
                >
                  <div className="count">{posts.length}</div>
                  <div className="counted">posts</div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    color: "white",
                    display: "grid",
                    justifyItems: "center",
                  }}
                >
                  <div className="count">{userLikes.length}</div>
                  <div className="counted">likes</div>
                </Grid>
              </Grid>
            </CardContent>
            <Divider variant="middle" sx={{ color: "white" }} />
            <CardContent>
              <MenuList xs={12}>
                <MenuItem
                  xs={12}
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  Feed
                </MenuItem>
                <MenuItem
                  xs={12}
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: "white",
                  }}
                >
                  My Posts
                </MenuItem>
                <MenuItem
                  xs={12}
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: "white",
                  }}
                >
                  Liked Posts
                </MenuItem>
                <MenuItem
                  xs={12}
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: "white",
                  }}
                >
                  Profiles
                </MenuItem>
                <MenuItem
                  xs={12}
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: "white",
                  }}
                >
                  My Photos
                </MenuItem>
              </MenuList>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={9}>
            <div>
              <ProfileHolderCover
                thisUser={thisUser}
                onEditUser={onEditUser}
                otherUser={otherUser}
              />
              {otherUser.coverPicture && otherUser.coverPicture !== "" ? (
                <CardMedia
                  type="button"
                  onClick={handleClickOpen}
                  className="cover-photo2"
                  sx={{
                    height: "500px",
                    display: "grid",
                    backgroundColor: "grey",
                    justifyContent: "center",
                    objectFit: "cover",
                  }}
                  image={otherUser.coverPicture}
                >
                  <Typography
                    className="cover-photo-text"
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{
                      fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                      fontWeight: "700",
                      color: "white",
                      textShadow: "2px 2px 4px black",
                      position: "relative",
                      alignSelf: "end",
                      justifySelf: "center",
                    }}
                  >
                    {otherUser.name.toUpperCase()}
                  </Typography>
                  <Typography
                    className="cover-photo-text2"
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                      fontWeight: "300",
                      color: "white",
                      top: "0px",
                      textShadow: "2px 2px 4px black",
                      position: "relative",
                      alignSelf: "baseline",
                      justifySelf: "center",
                    }}
                  >
                    @ {otherUser.username}
                  </Typography>
                </CardMedia>
              ) : (
                <CardMedia
                  type="button"
                  onClick={handleClickOpen}
                  className="cover-photo2"
                  sx={{
                    display: "grid",
                    backgroundColor: "#cecece",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: "#074147",
                      transition: "0.5s",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{
                      fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                      fontWeight: "100",
                      color: "white",
                      position: "relative",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  >
                    Add Cover Photo
                  </Typography>
                </CardMedia>
              )}
            </div>
          </Grid>
        </Grid>
        {thisUser.username === otherUser.username ? (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            >
              <InsertPhotoOutlinedIcon /> Upload Cover Photo
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
              >
                Insert Image URL
              </DialogContentText>
              <TextField
                name="coverPicture"
                error={!!errors.coverPicture}
                helperText={errors.coverPicture}
                onChange={handleChange}
                value={form.coverPicture}
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
            <img className="img-dialogue" src={otherUser.coverPicture} />
          </Dialog>
        )}
      </Card>
    </Fade>
  );
};

export default CoverCard;

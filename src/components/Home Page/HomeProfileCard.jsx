import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./HomeProfileCard.css";
import {
  Divider,
  Fade,
  Grid,
  MenuItem,
  MenuList,
  TextField,
  useTheme,
} from "@mui/material";
import Joi from "joi";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import ProfileHolder from "./ProfileHolder";
import { useNavigate } from "react-router-dom";

const HomeProfileCard = ({
  thisUser,
  currentUser,
  myPosts,
  myLikes,
  isLoading,
  onEditUser,
  setUpdatePicture,
}) => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

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
    const newdata = {
      ...currentUser,
      profilePicture: thisUser.profilePicture,
      coverPicture: form.coverPicture,
    };
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

  if (isLoading) {
    return (
      <Card>
        <span class="loader"></span>
      </Card>
    );
  }
  return (
    <Fade in timeout={1000} style={{ transitionDelay: "000ms" }}>
      <Grid component="form" onSubmit={handleSubmit}>
        <Card
          xs={12}
          sx={{
            borderRadius: "40px",
            backgroundColor: theme.palette.mainColor.main,
            boxShadow: "none",
            margin: "0.5vw",
            marginBlock: "1vw",
          }}
        >
          <div>
            {thisUser.coverPicture && thisUser.coverPicture !== "" ? (
              <CardMedia
                type="button"
                onClick={handleClickOpen}
                className="cover-photo"
                sx={{
                  height: 140,
                  display: "grid",
                  backgroundColor: "grey",
                  justifyContent: "center",
                }}
                image={thisUser.coverPicture}
              >
                <Typography
                  variant="h5"
                  component="div"
                  align="center"
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "500",
                    color: "white",
                    textShadow: "2px 2px 4px black",
                    position: "relative",
                    alignSelf: "end",
                    justifySelf: "center",
                  }}
                >
                  {currentUser.name.toUpperCase()}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: "white",
                    fontSize: "18px",
                    top: "0px",
                    textShadow: "2px 2px 4px black",
                    position: "relative",
                    alignSelf: "baseline",
                    justifySelf: "center",
                  }}
                >
                  @ {currentUser.username}
                </Typography>
              </CardMedia>
            ) : (
              <CardMedia
                type="button"
                onClick={handleClickOpen}
                className="cover-photo"
                sx={{
                  height: 140,
                  display: "grid",
                  backgroundColor: "#cecece",
                  justifyContent: "center",
                  "&:hover": { backgroundColor: "#074147", transition: "0.5s" },
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
          <ProfileHolder
            thisUser={thisUser}
            onEditUser={onEditUser}
            setUpdatePicture={setUpdatePicture}
          />
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
                <div className="count">{myPosts.length}</div>
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
                <div className="count">{myLikes.length}</div>
                <div className="counted">likes</div>
              </Grid>
            </Grid>
          </CardContent>
          <Divider variant="middle" sx={{ color: "white" }} />
          <CardContent>
            <MenuList xs={12}>
              <MenuItem
                xs={12}
                onClick={() => navigate("/home")}
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
                onClick={() => navigate("/userposts")}
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
                onClick={() => navigate("/likedposts")}
                sx={{
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "300",
                  color: "white",
                }}
              >
                Liked Posts
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/profiles/all")}
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
                onClick={() => navigate("/gallery")}
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
          <CardActions xs={12}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              sx={{
                borderRadius: "1000px",
                margin: "7px",
                backgroundColor: theme.palette.viewProfile.main,
                fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                fontWeight: "700",
                padding: "5px",
                "&:hover": {
                  backgroundColor: theme.palette.viewProfile.light,
                },
              }}
              onClick={() => navigate(`/profiles/${thisUser.username}`)}
            >
              <Typography
                sx={{
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                View My Profile
              </Typography>
            </Button>
          </CardActions>
        </Card>
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
      </Grid>
    </Fade>
  );
};

export default HomeProfileCard;

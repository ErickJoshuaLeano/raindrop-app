import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {
  Avatar,
  Dialog,
  Divider,
  Grid,
  Grow,
  IconButton,
  TextField,
} from "@mui/material";
import { ReactComponent as RaindropIcon } from "../Raindrop.svg";
import "./PostCard.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import * as authService from "../../services/auth";
import * as postsService from "../../services/posts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { styled, useTheme } from "@mui/system";
import Fade from "@mui/material/Fade";
import CommentModule from "./CommentModule";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Joi from "joi";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { Link } from "react-router-dom";

const PostCardDetails = ({
  post,
  isLoading,
  onDeletePost,
  onAddLikePost,
  onDeleteLike,
  onSubmitComment,
  updatePage,
  setUpdatePage,
}) => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();

  const navigate = useNavigate();

  const [openComments, setOpenComments] = useState(false);

  const [formPost, setFormPost] = useState({
    body: post.body,
    postPicture: post.postPicture || "",
  });

  const toggleOpenComments = () => {
    setOpenComments((value) => !value);
  };

  const handleLikePost = () => {
    onAddLikePost(post.id);
  };

  const handleRemoveLike = () => {
    onDeleteLike(post.likes.find((like) => like.userId === currentUser.id).id);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
    fontSize: "16px",
    color: theme.palette.postAccent.text,
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
    formPost.body = post.body;
    formPost.postPicture = post.postPicture;
  };

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    body: Joi.string().required(),
    postPicture: Joi.string().allow("").optional().uri(),
  });

  const handleSubmit = () => {
    handleCloseEdit();
    // event.preventDefault();
    postsService
      .updatePost(post.id, formPost)
      .then((response) => {
        // console.log(response);
        setUpdatePage(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message[0]);
        }
      });
  };

  const handleChange = ({ currentTarget: input }) => {
    setFormPost({
      ...formPost,
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
    const result = schema.validate(formPost);

    return !!result.error;
  };

  function time_ago(time) {
    switch (typeof time) {
      case "number":
        break;
      case "string":
        time = +new Date(time);
        break;
      case "object":
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, "s", 1], // 60
      [120, "1 m ago", "1 m from now"], // 60*2
      [3600, "m", 60], // 60*60, 60
      [7200, "1 h ago", "1 h from now"], // 60*60*2
      [86400, "h", 3600], // 60*60*24, 60*60
      [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
      [604800, "d", 86400], // 60*60*24*7, 60*60*24
      [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
      [2419200, "w", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "Last mth", "Next mth"], // 60*60*24*7*4*2
      [29030400, "mth", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Last yr", "Next yr"], // 60*60*24*7*4*12*2
      [2903040000, "yrs", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
      [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = "ago",
      list_choice = 1;

    if (seconds == 0) {
      return "Just now";
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = "from now";
      list_choice = 2;
    }
    var i = 0,
      format;
    while ((format = time_formats[i++]))
      if (seconds < format[0]) {
        if (typeof format[2] == "string") return format[list_choice];
        else
          return (
            Math.floor(seconds / format[2]) + " " + format[1] + " " + token
          );
      }
    return time;
  }

  return (
    <Fade in timeout={1000} style={{ transitionDelay: "400ms" }}>
      <Grid container component="formPost" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Card
            className="main-card"
            xs={12}
            sx={{
              borderRadius: "40px",
              paddingBottom: "-vh",
              boxShadow: "none",
              margin: "1vw",
              marginTop: "2vh",
              display: "grid",
              backgroundColor: theme.palette.card.main,
            }}
          >
            {post.postPicture !== null && post.postPicture !== "" ? (
              <div style={{ position: "relative" }}>
                <CardMedia
                  type="button"
                  component="img"
                  sx={{ objectFit: "cover" }}
                  image={post.postPicture}
                  onClick={handleClickOpen}
                />
                <div
                  style={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: "white",
                    textShadow: "2px 1px 6px black",
                    position: "absolute",

                    top: 10,
                    left: "0%",
                    transform: "translateX(50%)",
                    zIndex: "100",
                    textJustify: "baseline",
                  }}
                >
                  {time_ago(new Date(post.createdAt))}
                </div>
              </div>
            ) : (
              <CardMedia
                component="img"
                sx={{
                  backgroundColor: "red",

                  objectFit: "cover",
                }}
              />
            )}
            <CardContent>
              {(post.postPicture === null || post.postPicture === "") && (
                <div
                  style={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: theme.palette.mainText.light,
                    marginTop: "-11px",
                    marginLeft: "3%",
                    marginBottom: "10px",
                    zIndex: "100",
                    textJustify: "baseline",
                  }}
                >
                  {time_ago(new Date(post.createdAt))}
                </div>
              )}
              <Grid container xs={12}>
                <Grid item xs={6}>
                  <div className="p-profile-holder2">
                    <div className="p-layer3">
                      <RaindropIcon
                        className="p-raindrop2"
                        style={{
                          "--color": theme.palette.profileHolderPost.main,
                        }}
                      ></RaindropIcon>
                    </div>
                    <div className="p-layer4">
                      <Avatar
                        alt={post.user.name}
                        className="p-avatar"
                        type="button"
                        onClick={() =>
                          navigate(`/profiles/${post.user.username}`)
                        }
                        sx={{
                          height: "55px",
                          width: "55px",
                          border: "solid",
                          borderWidth: 3,
                          bordercolor: "white",
                        }}
                      >
                        <img
                          className="p-profile-picture-card2"
                          src={post.user.profilePicture}
                        />
                      </Avatar>
                    </div>
                    <div
                      className="p-layer5"
                      style={{ color: theme.palette.mainText.main }}
                    >
                      {post.user.name}
                    </div>
                    <div
                      className="p-layer6"
                      style={{ color: theme.palette.mainText.main }}
                    >
                      @ {post.user.username}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} justifyContent="flex-end" display="flex">
                  <div className="edit-post">
                    <Link to={`/postdetails/${post.id}`}>
                      <IconButton>
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Link>
                  </div>
                  {post.userId === currentUser.id && (
                    <div className="edit-post">
                      <IconButton onClick={handleClickOpenEdit}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </div>
                  )}
                  {post.userId === currentUser.id && (
                    <div
                      className="delete-post"
                      onClick={() => onDeletePost(post.id)}
                    >
                      <IconButton>
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </div>
                  )}
                </Grid>
              </Grid>

              <Typography
                variant="body1"
                color={theme.palette.mainText.light}
                sx={{
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",

                  paddingLeft: "76px",
                }}
              >
                {post.body}
              </Typography>
              {post.likes.length > 0 && (
                <div>
                  <Typography
                    className="likes"
                    sx={{
                      fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                      fontSize: "small",
                      fontWeight: "700",
                      marginTop: "30px",
                      marginLeft: "4px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FavoriteIcon
                      sx={{
                        color: theme.palette.postAccent.main,
                        marginLeft: "4%",
                      }}
                    />
                    <div className="space"></div>
                    {post.likes.length > 1 ? (
                      <div>Liked by {post.likes.length} people</div>
                    ) : (
                      <div>Liked by {post.likes.length} person</div>
                    )}
                  </Typography>
                </div>
              )}
              <Divider sx={{ marginTop: "10px" }} />
              <Grid
                justifyContent="center"
                display="flex"
                sx={{ marginTop: "10px" }}
              >
                <Grid>
                  {!post.likes.find(
                    (like) => like.userId === currentUser.id
                  ) ? (
                    <div>
                      <ColorButton
                        fontFamily="Raleway, Arial, Helvetica, sans-serif"
                        fontWeight="700"
                        endIcon={<FavoriteIcon sx={{ color: "#84e7b3" }} />}
                        sx={{ width: "150px" }}
                        onClick={() => handleLikePost()}
                      >
                        Like
                      </ColorButton>
                    </div>
                  ) : (
                    <ColorButton
                      fontFamily="Raleway, Arial, Helvetica, sans-serif"
                      fontWeight="700"
                      endIcon={
                        <FavoriteIcon
                          sx={{ color: theme.palette.postAccent.main }}
                        />
                      }
                      sx={{ width: "150px" }}
                      onClick={() => handleRemoveLike()}
                    >
                      Liked
                    </ColorButton>
                  )}
                </Grid>
                <Grid>
                  <div>
                    <ColorButton
                      variant="text"
                      startIcon={<ChatBubbleIcon sx={{ color: "#84e7b3" }} />}
                      sx={{ width: "150px" }}
                      onClick={toggleOpenComments}
                    >
                      Comment
                    </ColorButton>
                  </div>
                </Grid>
              </Grid>
              {false ? (
                <div></div>
              ) : (
                <div>
                  <CommentModule
                    post={post}
                    onSubmitComment={onSubmitComment}
                    updatePage={updatePage}
                    setUpdatePage={setUpdatePage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          <Dialog open={open} onClose={handleClose}>
            <img className="img-dialogue" src={post.postPicture} />
          </Dialog>
          <Dialog open={openEdit} onClose={handleCloseEdit}>
            <DialogTitle
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            >
              <EditOutlinedIcon /> Edit
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
              >
                Edit Post
              </DialogContentText>
              <TextField
                name="body"
                error={!!errors.body}
                helperText={errors.body}
                onChange={handleChange}
                value={formPost.body}
                autoFocus
                margin="dense"
                id="name"
                label="Post Content"
                fullWidth
                variant="standard"
                sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
              />
              <TextField
                name="postPicture"
                error={!!errors.postPicture}
                helperText={errors.postPicture}
                onChange={handleChange}
                value={formPost.postPicture}
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
                onClick={handleCancelEdit}
                sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default PostCardDetails;

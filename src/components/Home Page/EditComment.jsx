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
import { styled } from "@mui/system";
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

const EditComment = ({
  comment,
  setOpenEdit,
  setUpdatePage,
  handleCancelEdit,
}) => {
  const [formComment, setFormComment] = useState({
    body: comment.body,
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    body: Joi.string().required(),
  });

  const handleSubmit = () => {
    setOpenEdit(false);
    postsService
      .updateComment(comment.post.id, formComment, comment.id)
      .then((response) => {
        setUpdatePage(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert(error.response.data.message[0]);
        }
      });
  };

  const handleChange = ({ currentTarget: input }) => {
    setFormComment({
      ...formComment,
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
    const result = schema.validate(formComment);

    return !!result.error;
  };

  return (
    <div>
      <Grid component="formComment" onSubmit={handleSubmit}>
        <DialogTitle
          sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
        >
          <EditOutlinedIcon /> Edit
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
          >
            Edit Comment
          </DialogContentText>
          <TextField
            name="body"
            error={!!errors.body}
            helperText={errors.body}
            onChange={handleChange}
            value={formComment.body}
            autoFocus
            margin="dense"
            id="name"
            label="Post Content"
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
      </Grid>
    </div>
  );
};

export default EditComment;

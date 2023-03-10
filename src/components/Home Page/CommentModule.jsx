import {
  Avatar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as postsService from "../../services/posts";
import * as authService from "../../services/auth";
import * as likesService from "../../services/likes";
import "./CommentModule.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddComment from "./AddComment";
import { styled, useTheme } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditComment from "./EditComment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentModule = ({
  post,
  onSubmitComment,
  updatePage,
  setUpdatePage,
  setUpdateComments,
}) => {
  const theme = useTheme();
  const currentUser = authService.getCurrentUser();
  const [comments, setComments] = useState([]);
  const [commentToEdit, setCommentToEdit] = useState([]);
  const ColorButton = styled(Button)(({ theme }) => ({
    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
    fontSize: "16px",
    color: "#074147",
  }));

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = (comment) => {
    setOpenEdit(true);
    setCommentToEdit(comment);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    postsService.fetchCommentsByPost(post.id).then((response) => {
      setComments(response.data);
      setUpdatePage(false);
    });
  }, [post, updatePage]);

  const handleDeleteComment = async (postId, commentId) => {
    const commentsClone = [...comments];

    try {
      await postsService.deleteComment(postId, commentId);
      setUpdatePage(true);
      toast("Comment has been deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast("Comment already deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setComments(commentsClone);
    }
  };

  const handleAddLikeComment = (commentId) => {
    likesService
      .addCommentLike(commentId)
      .then((response) => {
        setUpdatePage(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message[0], {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const handleDeleteLike = async (id) => {
    try {
      await likesService.deleteLike(id);
      setUpdatePage(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("Like already removed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handleRemoveLike = (comment) => {
    handleDeleteLike(
      comment.likes.find((comment) => comment.userId === currentUser.id).id
    );
  };

  return (
    <div className="comment-container">
      <AddComment
        post={post}
        onSubmitComment={onSubmitComment}
        setUpdateComments={setUpdateComments}
      />
      {comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <Grid container xs={12}>
              <Grid item xs={10}>
                <div className="single-comment">
                  <div className="comment-user">
                    <div className="user-details">
                      <Avatar
                        className="p-avatar"
                        type="button"
                        sx={{
                          height: "20px",
                          width: "20px",
                          border: "solid",
                          borderWidth: 3,
                          bordercolor: "white",
                        }}
                      >
                        <img
                          className="c-profile-picture-card2"
                          src={comment.user.profilePicture}
                        />
                      </Avatar>
                      <div className="comment-username">
                        {comment.user.name}
                      </div>
                    </div>
                    {comment.userId === currentUser.id && (
                      <div className="delete-post">
                        <IconButton
                          onClick={() => handleClickOpenEdit(comment)}
                        >
                          <EditIcon sx={{ height: "20px", width: "20px" }} />
                        </IconButton>
                      </div>
                    )}
                    {(post.userId === currentUser.id ||
                      comment.userId === currentUser.id) && (
                      <div className="delete-post">
                        <IconButton
                          onClick={() =>
                            handleDeleteComment(post.id, comment.id)
                          }
                        >
                          <DeleteIcon sx={{ height: "20px", width: "20px" }} />
                        </IconButton>
                        <ToastContainer />
                      </div>
                    )}
                  </div>

                  <div className="comment-content">{comment.body}</div>
                </div>
              </Grid>
              <Grid container xs={2}>
                <Grid>
                  <Typography sx={{ marginTop: "13px" }}>
                    {comment.likes.length}
                  </Typography>
                </Grid>
                <Grid>
                  {!comment.likes.find(
                    (comment) => comment.userId === currentUser.id
                  ) ? (
                    <div>
                      <IconButton
                        sx={{ marginTop: "5px" }}
                        onClick={() => handleAddLikeComment(comment.id)}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <ToastContainer />
                    </div>
                  ) : (
                    <IconButton
                      sx={{ marginTop: "5px" }}
                      onClick={() => handleRemoveLike(comment)}
                    >
                      <FavoriteIcon sx={{ color: "#74dfea" }} />
                    </IconButton>
                  )}
                  <ToastContainer />
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Dialog open={openEdit} onClose={handleCloseEdit}>
            <EditComment
              comment={commentToEdit}
              setOpenEdit={setOpenEdit}
              setUpdatePage={setUpdatePage}
              handleCancelEdit={handleCancelEdit}
            />
          </Dialog>
        </div>
      ) : (
        <div className="comment-content">No Comments yet</div>
      )}
    </div>
  );
};

export default CommentModule;

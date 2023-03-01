import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import "./PostCard.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import * as postsService from "../../services/posts";
import Joi from "joi";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditComment = ({
  comment,
  setOpenEdit,
  setUpdatePage,
  handleCancelEdit,
}) => {
  const [formcomment, setformcomment] = useState({
    body: comment.body,
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    body: Joi.string().required(),
  });

  const handleSubmit = () => {
    setOpenEdit(false);
    postsService
      .updateComment(comment.post.id, formcomment, comment.id)
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
    setformcomment({
      ...formcomment,
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

  return (
    <div>
      <Grid component="formcomment" onSubmit={handleSubmit}>
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
            value={formcomment.body}
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

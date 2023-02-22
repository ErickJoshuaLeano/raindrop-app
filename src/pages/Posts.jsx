import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Avatar,
  InputBase,
  Divider,
  CardMedia,
} from "@mui/material";
import Box from "@mui/material/Box";
import Joi from "joi";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import * as authService from "../services/auth";
import { ReactComponent as RaindropIcon } from "../components/Raindrop.svg";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import "./Posts.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Posts = ({ onSubmit, initialValue }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    form.postPicture = "";
  };

  const [form, setForm] = useState(
    initialValue || {
      body: "",
      postPicture: "",
    }
  );

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    body: Joi.string().required(),
    postPicture: Joi.string().uri().allow("").optional(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
    form.body = "";
    form.postPicture = "";
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
  const currentUser = authService.getCurrentUser();

  return (
    <Grid
      xs={12}
      component="form"
      justifyContent="center"
      onSubmit={handleSubmit}
    >
      <Card
        xs={12}
        sx={{
          borderRadius: "40px",
          boxShadow: "none",
          margin: "1vw",
          marginBlock: "1vw",
        }}
      >
        <CardMedia
          sx={{ height: "34px", backgroundColor: "#cecece", display: "grid" }}
        >
          {" "}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "500",
              color: "#5a5a5a",
              fontSize: "15px",
              right: "20px",
              position: "relative",
              alignSelf: "end",
              justifySelf: "end",
            }}
          >
            <div className="drop-a-thought">Drop a thought</div>
          </Typography>
        </CardMedia>
        <div className="profile-holder2">
          <div className="layer3">
            <RaindropIcon className="raindrop2"></RaindropIcon>
          </div>
          <div className="layer4">
            <Avatar
              type="button"
              sx={{
                height: "55px",
                width: "55px",
                border: "solid",
                borderWidth: 3,
                bordercolor: "white",
              }}
            >
              <img
                className="profile-picture-card2"
                src={currentUser.profilePicture}
              />
            </Avatar>
          </div>
          <div className="layer5">{currentUser.name}</div>
          <div className="layer6">@ {currentUser.username}</div>
        </div>
        <CardContent xs={12}>
          <Grid container>
            <Grid item xs={7} sm={6} md={8}>
              <Box>
                <InputBase
                  name="body"
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={handleChange}
                  value={form.body}
                  multiline
                  fullWidth
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    paddingLeft: "80px",
                  }}
                  placeholder="Say Something"
                />
              </Box>
            </Grid>
            <Grid xs={5} sm={6} md={4} item>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignContent="baseline"
              >
                <Button
                  className="add-photo-button"
                  variant="contained"
                  startIcon={<InsertPhotoOutlinedIcon />}
                  disableElevation
                  fullWidth
                  onClick={handleClickOpen}
                  sx={{
                    borderRadius: "1000px",
                    margin: "7px",
                    color: "grey",
                    backgroundColor: "#eaebef",
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "700",
                    padding: "5px",
                    "&:hover": { backgroundColor: "#074147", color: "white" },
                  }}
                >
                  <div className="button-text">Add Photo</div>
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider
            variant="middle"
            sx={{ color: "#cecece", borderBottomWidth: 2 }}
          />
        </CardContent>
        <Box display="flex" justifyContent="center" alignContent="baseline">
          <Button
            className="add-photo-button"
            disabled={isFormInvalid()}
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            disableElevation
            type="submit"
            sx={{
              width: "100px",
              padding: "10px",
              borderRadius: "1000px",
              margin: "7px",
              backgroundColor: "#84e7b3",
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "700",
              padding: "5px",

              "&:hover": { backgroundColor: "#074147" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
        >
          <InsertPhotoOutlinedIcon /> Add Image to Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
          >
            Insert Image URL
          </DialogContentText>
          <TextField
            name="postPicture"
            error={!!errors.postPicture}
            helperText={errors.postPicture}
            onChange={handleChange}
            value={form.postPicture}
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
            onClick={handleClose}
            sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Posts;

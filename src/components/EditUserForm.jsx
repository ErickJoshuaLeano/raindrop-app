import {
  Button,
  Card,
  Grid,
  InputAdornment,
  InputBase,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Joi from "joi";
import * as profilesService from "../services/profile";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MailIcon from "@mui/icons-material/Mail";
import PhotoIcon from "@mui/icons-material/Photo";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

const EditUserForm = ({ thisUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: thisUser.name,
    email: thisUser.email,
    username: thisUser.username,
    profilePicture: thisUser.profilePicture,
    coverPicture: thisUser.coverPicture,
  });

  const [errors, setErrors] = useState({});
  const theme = useTheme();

  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    username: Joi.string().min(5).max(15).required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    profilePicture: Joi.string().uri().allow("").optional(),
    coverPicture: Joi.string().uri().allow("").optional(),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await profilesService
        .updateProfile({
          name: form.name,
          email: form.email,
          username: form.username,
          profilePicture: form.profilePicture,
          coverPicture: form.coverPicture,
        })
        .then(navigate("/home"));
      toast("Profile Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      if (
        (error.response && error.response.status === 403) ||
        (error.response && error.response.status === 422) ||
        (error.response && error.response.status === 409)
      ) {
        alert(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
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

  const handleCancel = () => {
    form.name = thisUser.name;
    form.email = thisUser.email;
    form.username = thisUser.username;
    form.profilePicture = thisUser.profilePicture;
    form.coverPicture = thisUser.coverPicture;
  };

  return (
    <div>
      {" "}
      <Card>
        <Grid
          container
          xs={12}
          display="flex"
          justifyItems="center"
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item xs={11}>
            <TextField
              name="name"
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              value={form.name}
              label="Name"
              fullWidth
              sx={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
              InputProps={{
                style: {
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  backgroundColor: theme.palette.darkAccents.main,
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon sx={{ marginRight: "10px" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              name="username"
              error={!!errors.username}
              helperText={errors.username}
              onChange={handleChange}
              value={form.username}
              label="Userame"
              fullWidth
              sx={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
              InputProps={{
                style: {
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  backgroundColor: theme.palette.darkAccents.main,
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon sx={{ marginRight: "10px" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              name="email"
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleChange}
              value={form.email}
              label="E-mail Address"
              fullWidth
              sx={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
              InputProps={{
                style: {
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  backgroundColor: theme.palette.darkAccents.main,
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <MailIcon sx={{ marginRight: "10px" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              name="profilePicture"
              error={!!errors.profilePicture}
              helperText={errors.profilePicture}
              onChange={handleChange}
              value={form.profilePicture}
              label="Profile Photo"
              fullWidth
              sx={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
              placeholder="Profile Photo"
              InputProps={{
                style: {
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  backgroundColor: theme.palette.darkAccents.main,
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <PhotoIcon sx={{ marginRight: "10px" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              name="coverPicture"
              error={!!errors.coverPicture}
              helperText={errors.coverPicture}
              onChange={handleChange}
              value={form.coverPicture}
              label="Cover Photo"
              fullWidth
              sx={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
              placeholder="Cover Photo"
              InputProps={{
                style: {
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  backgroundColor: theme.palette.darkAccents.main,
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <PhotoSizeSelectActualIcon sx={{ marginRight: "10px" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleCancel}
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <Button
              disabled={isFormInvalid()}
              type="submit"
              sx={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif" }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default EditUserForm;

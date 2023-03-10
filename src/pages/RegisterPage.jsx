import Joi from "joi";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as authService from "../services/auth";
import { ToastContainer, toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import "./LoginRegisterPage.css";
import "react-toastify/dist/ReactToastify.css";
import ProfileHolderRegister from "../components/Register Page/ProfileHolderRegister";

const RegisterPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    username: Joi.string().min(5).max(15).required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
      .required()
      .label("Password")
      .messages({
        "string.empty": `Password cannot be empty`,
        "string.min": "Password should be between 8 to 20 characters",
        "object.regex": "Must have at least 8 characters",
        "string.pattern.base": `Password should be between 8 to 20 characters and contain an uppercase and lowercase letter, numbers and special character`,
      }),
    confirmPassword: Joi.string().required().valid(form.password).messages({
      "any.only": "The two passwords do not match",
      "any.required": "Please re-enter the password",
    }),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    function timeout(delay) {
      return new Promise((res) => setTimeout(res, delay));
    }

    try {
      const response = await authService.register(
        profilePicture,
        form.name,
        form.email,
        form.username,
        form.password,
        form.confirmPassword
      );
      toast("Registration successful");
      await timeout(1500);
      navigate("/login");
    } catch (error) {
      if (
        (error.response && error.response.status === 403) ||
        (error.response && error.response.status === 422) ||
        (error.response && error.response.status === 409)
      ) {
        toast(error.response.data.message, {
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

  const [passwordShown, setPasswordShown] = useState(false);

  const handleClickShowPassword = () => setPasswordShown((show) => !show);
  const handleMouseDownPassword = () => {
    setPasswordShown(passwordShown);
  };

  return (
    <>
      <div className="body">
        <Grid className="whole-grid">
          <Grid item>
            <Typography
              variant="h4"
              components="h2"
              sx={{
                fontFamily: "Nunito",
              }}
            >
              R A I N D R O P
            </Typography>
            <Typography
              variant="h6"
              components="h2"
              ml={14.7}
              sx={{
                fontFamily: "Nunito",
              }}
            >
              S I G N - U P
            </Typography>
          </Grid>
          <Grid
            container
            component="form"
            onSubmit={handleSubmit}
            className="inputField"
          >
            <Grid item xs={1} sm={1} lg={5} xl={5}>
              <Box
                component="img"
                sx={{
                  height: 400,
                  width: 500,
                }}
                alt="Globe"
                src="images\globe.png"
                mt={5}
                className="globe"
              />
            </Grid>

            <Grid item xs={11} sm={11} lg={7} xl={7}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={11} mt={2}>
                    <ProfileHolderRegister
                      setProfilePicture={setProfilePicture}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      required
                      error={!!errors.name}
                      helperText={errors.name}
                      onChange={handleChange}
                      value={form.name}
                      label="Name"
                      fullWidth
                      className="grid-5"
                      sx={{
                        "& fieldset": { border: "none" },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="username"
                      required
                      error={!!errors.username}
                      helperText={errors.username}
                      onChange={handleChange}
                      value={form.username}
                      label="Username"
                      fullWidth
                      className="grid-5"
                      sx={{
                        "& fieldset": { border: "none" },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <PersonPinCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="email"
                      required
                      error={!!errors.email}
                      helperText={errors.email}
                      onChange={handleChange}
                      value={form.email}
                      label="Email"
                      fullWidth
                      className="grid-5"
                      sx={{
                        "& fieldset": { border: "none" },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="password"
                      required
                      error={!!errors.password}
                      helperText={errors.password}
                      onChange={handleChange}
                      value={form.password}
                      label="Password"
                      type={passwordShown ? "text" : "password"}
                      fullWidth
                      className="grid-5"
                      sx={{
                        "& fieldset": { border: "none" },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="start"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {passwordShown ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="confirmPassword"
                      required
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      onChange={handleChange}
                      value={form.confirmPassword}
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      className="grid-5"
                      sx={{
                        "& fieldset": { border: "none" },
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  className="btnSignUp"
                  disabled={isFormInvalid()}
                  type="submit"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
                <ToastContainer />
              </CardActions>
              <Grid container justifyContent="center" ml={1}>
                <Grid item className="alreadyAcc">
                  <Link to="/login" variant="body2">
                    Already have an account?
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default RegisterPage;

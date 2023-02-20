import {
  Button,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as authService from "../services/auth";

const RegisterPage = () => {
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
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%&*]{8,20}$"))
      .required()
      .messages({
        "string.pattern.base": `Password should be between 8 to 20 characters and contain letters, numbers and special character`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }),
    confirmPassword: Joi.string().required().valid(form.password).messages({
      "any.only": "The two passwords do not match",
      "any.required": "Please re-enter the password",
    }),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.register(
        form.name,
        form.email,
        form.username,
        form.password,
        form.confirmPassword
      );
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
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

  return (
    <>
      <Grid className="whole-grid">
        <Grid item xs={4} ml={10}>
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
        <Grid container component="form" onSubmit={handleSubmit}>
          <Grid item xs={7}>
            <Box
              component="img"
              sx={{
                height: 400,
                width: 500,
              }}
              alt="Globe"
              src="images\globe.png"
              mt={5}
            />
          </Grid>

          <Grid item xs={5}>
            <CardContent>
              <Grid container spacing={2}>
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
                  />
                </Grid>
                <Grid item xs={12}>
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
                  />
                </Grid>
                <Grid item xs={12}>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                    onChange={handleChange}
                    value={form.password}
                    label="Password"
                    type="password"
                    fullWidth
                    className="grid-5"
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
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
              >
                Sign up
              </Button>
            </CardActions>
            <Grid container justifyContent="center" ml={1} mt={1}>
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;

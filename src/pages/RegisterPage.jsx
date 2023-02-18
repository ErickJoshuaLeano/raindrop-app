import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as authService from "../services/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Raindrop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    confirmPassword: Joi.string().required(),
    // repeatPassword: Joi.valid(userData.password).messages({
    //   "any.only": "The two passwords do not match",
    //   "any.required": "Please re-enter the password",
    // }),
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
    <Grid
      container
      component="form"
      justifyContent="flex-end"
      onSubmit={handleSubmit}
    >
      <Grid item xs={5}>
        <Card>
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
                  variant="standard"
                  fullWidth
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
                  variant="standard"
                  fullWidth
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
                  variant="standard"
                  fullWidth
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
                  variant="standard"
                  type="password"
                  fullWidth
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
                  variant="standard"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              disabled={isFormInvalid()}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
    // <Copyright sx={{ mt: 5 }} />
  );
};

export default RegisterPage;

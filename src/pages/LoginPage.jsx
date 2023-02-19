import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    onLogin(form.username, form.password);
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

  const theme = createTheme({
    palette: {
      primary: {
        light: "#52bbc7",
        main: "#27ABB9",
        dark: "#1b7781",
        contrastText: "#fff",
      },
      secondary: {
        light: "#8fe5ee",
        main: "#74DFEA",
        dark: "#519ca3",
        contrastText: "#000",
      },
    },
  });

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      onSubmit={handleSubmit}
    >
      <Grid item xs={6}>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
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
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              disabled={isFormInvalid()}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign In <Link to="/home"></Link>
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/register" variant="body2">
                  Create an account?
                </Link>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

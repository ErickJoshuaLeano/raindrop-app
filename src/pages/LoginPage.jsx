import {
  Button,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
            ml={16}
            sx={{
              fontFamily: "Nunito",
            }}
          >
            S I G N - I N
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
          <Grid item xs={5} mt={10}>
            <CardContent>
              <Grid container spacing={2}>
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
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                className="btnSignIn"
                disabled={isFormInvalid()}
                type="submit"
                fullWidth
              >
                Sign In <Link to="/home"></Link>
              </Button>
            </CardActions>
            <Grid container justifyContent="center" ml={1} mt={1}>
              <Grid item>
                <Link to="/register" variant="body2">
                  Create an account?
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;

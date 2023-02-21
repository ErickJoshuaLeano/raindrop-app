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
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const Forgot = (onForgot) => {
  const [form, setForm] = useState({
    email: "",
  });
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    onForgot(form.email);
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
        <Grid item xs={4}>
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
              className="globe"
            />
          </Grid>

          <Grid item xs={5}>
            <CardContent>
              <Typography
                variant="h6"
                components="h2"
                ml={14.7}
                sx={{
                  fontFamily: "Nunito",
                }}
              >
                PLEASE SET YOUR EMAIL
              </Typography>
              <Grid container spacing={2}>
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon />
                        </InputAdornment>
                      ),
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
                Submit
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Forgot;

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
import * as React from "react";
import { Link } from "react-router-dom";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import "./LoginRegisterPage.css";

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const schema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
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

  const [passwordShown, setPasswordShown] = React.useState(false);

  const handleClickShowPassword = () => setPasswordShown((show) => !show);
  const handleMouseDownPassword = () => {
    setPasswordShown(passwordShown);
  };

  return (
    <>
      <div className="body">
        <Grid className="whole-grid">
          <Grid item xs={8}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <PersonPinCircleIcon />
                          </InputAdornment>
                        ),
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
                </Grid>
                {/* <Grid container justifyContent="flex-end" mt={1}>
                  <Grid item>
                    <Link to="/forgot">Forgot password?</Link>
                  </Grid>
                </Grid> */}
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
      </div>
    </>
  );
};

export default LoginPage;

import { Grid, Fade, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import * as profilesService from "../services/profile";
import "./HomePages.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import HomeIcon from "@mui/icons-material/Home";
import Joi from "joi";

const EditUserPage = () => {
  const theme = useTheme();
  const [thisUser, setThisUser] = useState([]);
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

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
        form.username
      );
      alert("Registration successful");

      navigate("/login");
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

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
    window.location.reload(false);
    setLoading(false);
    setLoadingUser(false);
  };

  useEffect(() => {
    profilesService.fetchAllUsers().then((response) => {
      setUsers(response.data);
      setLoading(false);
      setUpdatePage(false);
    });
  }, [users]);

  useEffect(() => {
    profilesService.fetchCurrentUser().then((response) => {
      setThisUser(response.data);
      setLoadingUser(false);
      setUpdatePage(false);
    });
  }, [updatePage]);

  if (isLoadingUser || isLoading) {
    return (
      <div class="loader2">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    );
  }

  return (
    <>
      <Fade in timeout={1000} style={{ transitionDelay: "200ms" }}>
        <div
          className="background"
          style={{ backgroundColor: theme.palette.background.main }}
        >
          <NavBar
            onLogout={handleLogout}
            thisUser={thisUser}
            updatePage={updatePage}
            setUpdatePage={setUpdatePage}
          />
          <div className="grid-container">
            <Grid
              className="grid"
              container
              xs={12}
              sm={11}
              md={10.5}
              sx={{ height: "100vh" }}
            >
              <Grid
                className="column"
                item={true}
                lg={3}
                xl={2.5}
                sx={{
                  height: "fit-content",
                  display: { xs: "none", lg: "table-cell" },
                }}
              ></Grid>
              <Grid
                className="column"
                item={true}
                xs={12}
                sm={8}
                lg={6}
                xl={6}
                sx={{ justifyItems: "center" }}
              ></Grid>
              <Grid
                className="column"
                item={true}
                sm={4}
                lg={3}
                xl={2.5}
                sx={{
                  height: "100vh",
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                <Fade in timeout={1000} style={{ transitionDelay: "600ms" }}>
                  <Card
                    xs={12}
                    sx={{
                      borderRadius: "40px",
                      backgroundColor: "#27abb9",
                      boxShadow: "none",
                      margin: "0.5vw",
                      marginBlock: "1vw",
                    }}
                  >
                    {" "}
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/home"}
                    >
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          width: "94.5%",
                          borderRadius: "1000px",
                          margin: "7px",
                          backgroundColor: "#1b8b97",
                          fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                          fontWeight: "700",
                          padding: "5px",
                          "&:hover": { backgroundColor: "#074147" },
                        }}
                      >
                        <HomeIcon />
                        Return to Home
                      </Button>
                    </Link>
                  </Card>
                </Fade>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    </>
  );
};
export default EditUserPage;

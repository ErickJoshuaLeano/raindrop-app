import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Dialog, Fade, Grid, IconButton } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";

const WeatherWidget = () => {
  return (
    <Fade in timeout={1000} style={{ transitionDelay: "850ms" }}>
      <Card
        type="button"
        sx={{
          borderRadius: "40px",
          backgroundColor: "#74dfea",
          boxShadow: "none",
          margin: "0.5vw",
          marginBlock: "1vw",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Grid container display="grid" alignContent="center">
            <Grid item xs={12}>
              <a href="https://www.accuweather.com/" target="_blank">
                <IconButton>
                  <CloudIcon sx={{ fontSize: "75px" }} />
                </IconButton>
              </a>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default WeatherWidget;

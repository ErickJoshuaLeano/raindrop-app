import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Fade, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

const CalendarWidget = () => {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const newDate = getCurrentDate();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  return (
    <Fade in timeout={1000} style={{ transitionDelay: "850ms" }}>
      <Card
        type="button"
        sx={{
          borderRadius: "40px",
          backgroundColor: "#27abb9",
          boxShadow: "none",
          margin: "0.5vw",
          marginBlock: "1vw",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Grid container display="grid" alignContent="center">
            <Grid item xs={12}>
              <Typography
                xs={12}
                sx={{
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "500",
                  margin: "10px",
                  padding: "2px",
                  justifySelf: "center",
                  display: "flex",
                  color: "white",
                }}
              >
                <CalendarMonthIcon sx={{ alignSelf: "center" }} />
                <div className="spacer"></div>
                {monthNames[current.getMonth()]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                xs={12}
                sx={{
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "700",
                  fontSize: "50px",
                  margin: "10px",
                  padding: "2px",
                  justifySelf: "center",
                  display: "flex",
                  color: "white",
                  transform: "translateY(-60%)",
                  marginBottom: "-55px",
                }}
              >
                <div className="spacer"></div>
                {current.getDate()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default CalendarWidget;

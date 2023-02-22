import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  return (
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
      <CardMedia />

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {getCurrentDate()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;

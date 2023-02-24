import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const RaindropCards = () => {
  return (
    <Card
      sx={{
        borderRadius: "40px",
        boxShadow: "none",
        margin: "0.5vw",
        marginBlock: "1vw",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Recent Raindrops
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RaindropCards;

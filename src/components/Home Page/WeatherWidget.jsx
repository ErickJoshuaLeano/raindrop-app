import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardMedia,
  Dialog,
  Fade,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import Iframe from "react-iframe";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const WeatherWidget = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
              <IconButton onClick={handleClickOpen}>
                <CloudIcon
                  sx={{ fontSize: "4vw", color: theme.palette.card.main }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Grid>
            {" "}
            <IconButton onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>{" "}
          </Grid>{" "}
          <Iframe
            url="https://www.tomorrow.io/weather/PH"
            width="600px"
            height="720px"
            id=""
            className=""
            display="block"
            position="relative"
          />
        </Dialog>
      </Card>
    </Fade>
  );
};

export default WeatherWidget;

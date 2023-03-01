import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Dialog, Fade, Grid, IconButton, useTheme } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Iframe from "react-iframe";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const NewsWidget = () => {
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
          backgroundColor: "#84e7b3",
          boxShadow: "none",
          margin: "0.5vw",
          marginBlock: "1vw",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Grid container display="grid" alignContent="center">
            <Grid item xs={12} onClick={handleClickOpen}>
              <IconButton>
                <NewspaperIcon
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
            url="https://www.cnnphilippines.com/"
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

export default NewsWidget;

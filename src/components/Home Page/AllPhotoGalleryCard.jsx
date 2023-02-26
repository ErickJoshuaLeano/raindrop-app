import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import "./GalleryCard.css";
import { Fade, Grid, useTheme } from "@mui/material";
import * as profilesService from "../../services/profile";
import { useEffect, useState } from "react";
import * as authService from "../../services/auth";

const AllPhotoGalleryCard = ({ posts }) => {
  const theme = useTheme();
  const filter = posts.filter(
    (posts) => posts.postPicture !== null && posts.postPicture !== ""
  );

  const photos = filter.slice(0, 20);

  return (
    <Fade in timeout={1000} style={{ transitionDelay: "800ms" }}>
      <Card
        xs={12}
        sx={{
          borderRadius: "40px",
          backgroundColor: theme.palette.card.main,
          boxShadow: "none",
          margin: "0.5vw",
          display: "grid",
          marginTop: "2vh",
        }}
      >
        <Typography
          xs={12}
          sx={{
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "500",
            margin: "10px",
            padding: "2px",
            justifySelf: "center",
            display: "flex",
          }}
        >
          <PhotoSizeSelectActualOutlinedIcon sx={{ alignSelf: "center" }} />
          <div className="spacer"></div>Everybody's Photos
        </Typography>
        <Grid container xs={12}>
          {photos.map((photo) => (
            <Grid item xs={6}>
              <CardMedia
                type="button"
                image={photo.postPicture}
                style={{ height: 140, objectFit: "fill" }}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Fade>
  );
};

export default AllPhotoGalleryCard;

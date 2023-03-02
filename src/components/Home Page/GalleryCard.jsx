import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import "./GalleryCard.css";
import { Button, Fade, Grid, useTheme } from "@mui/material";
import * as profilesService from "../../services/profile";
import { useEffect, useState } from "react";
import * as authService from "../../services/auth";

const GalleryCard = ({ posts, username, title }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    profilesService.fetchPostsbyUsername(username).then((response) => {
      setMyPosts(response.data);
      setLoading(false);
    });
  }, [posts]);
  const myPhotos = myPosts.filter(
    (myPosts) => myPosts.postPicture !== null && myPosts.postPicture !== ""
  );

  if (isLoading) {
    return (
      <Fade in timeout={1000} style={{ transitionDelay: "500ms" }}>
        <Card
          xs={12}
          sx={{
            backgroundColor: theme.palette.card.main,
            borderRadius: "40px",
            paddingBottom: "3vh",
            boxShadow: "none",
            margin: "0.5vw",
            display: "grid",
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
            <div className="spacer"></div> My Photos
          </Typography>
          <Grid container xs={12}>
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: "center",
                display: "grid",
                justifyItems: "center",
              }}
            >
              <span className="loader"></span>
            </Grid>
          </Grid>
        </Card>
      </Fade>
    );
  }

  return (
    <Fade in timeout={1000} style={{ transitionDelay: "500ms" }}>
      <Card
        xs={12}
        sx={{
          borderRadius: "40px",

          boxShadow: "none",
          margin: "0.5vw",
          display: "grid",
          marginTop: "2vh",
        }}
      >
        <Button
          xs={12}
          sx={{
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "500",
            color: theme.palette.button.main,
            margin: "10px",
            padding: "2px",
            justifySelf: "center",
            display: "flex",
          }}
          onClick={() => navigate("/gallery")}
        >
          <PhotoSizeSelectActualOutlinedIcon sx={{ alignSelf: "center" }} />
          <div className="spacer"></div>My Photos
        </Button>
        <Grid container>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 1] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 1].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.main,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 2] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 2].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.light,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 3] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 3].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.light,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 4] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 4].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.main,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 5] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 5].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.main,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 6] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 6].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.light,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 7] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 7].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.light,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 8] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 8].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.main,
                  }}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 9] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 9].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.main,
                  }}
                />
              )}
            </div>
          </Grid>{" "}
          <Grid item xs={6}>
            <div>
              {myPhotos[myPhotos.length - 10] ? (
                <CardMedia
                  sx={{ height: 140 }}
                  image={myPhotos[myPhotos.length - 10].postPicture}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: theme.palette.galleryFiller.light,
                  }}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Card>
    </Fade>
  );
};

export default GalleryCard;

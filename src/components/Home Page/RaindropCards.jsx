import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ReactComponent as RaindropIcon } from "../Raindrop.svg";
import "./RaindropCards.css";
import { Fade, ImageListItemBar, useTheme } from "@mui/material";

const RaindropCards = ({ posts, updatePage, setUpdatePage }) => {
  const theme = useTheme();
  const filter = posts.filter(
    (posts) => posts.postPicture !== null && posts.postPicture !== ""
  );

  const photos = filter.slice(0, 10);

  return (
    <Fade in timeout={1000} style={{ transitionDelay: "400ms" }}>
      <Card
        sx={{
          backgroundColor: theme.palette.card.main,
          borderRadius: "40px",
          boxShadow: "none",
          margin: "1vw",
          marginBlock: "1vw",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontSize: 14,
            }}
            color="text.secondary"
            gutterBottom
          >
            <RaindropIcon className="r-raindrop" />
            Recent Raindrops
          </Typography>
          <Box>
            <ImageList
              className="image-list"
              sx={{
                display: "flex",
                flexDirection: "row",
                scrollbarWidth: "thin",
              }}
              rowHeight={300}
            >
              {photos.map((photo) => (
                <Fade in timeout={1000} style={{ transitionDelay: "400ms" }}>
                  <ImageListItem>
                    <img
                      className="unselectable"
                      src={photo.postPicture}
                      srcSet={photo.postPicture}
                      alt={photo.user.username}
                      loading="lazy"
                      style={{
                        width: "150px",
                        padding: "4px",
                        borderRadius: "30px",
                      }}
                    />
                    <ImageListItemBar
                      position="top"
                      title={photo.user.name}
                      sx={{
                        background: "none",
                        fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                      }}
                    />
                  </ImageListItem>
                </Fade>
              ))}
            </ImageList>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default RaindropCards;

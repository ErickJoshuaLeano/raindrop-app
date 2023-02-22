import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./HomeProfileCard.css";
import { ReactComponent as RaindropIcon } from "../Raindrop.svg";
import { Avatar, Divider, Grid, MenuItem, MenuList } from "@mui/material";
import * as postsService from "../../services/posts";
import { useState } from "react";

const HomeProfileCard = ({ currentUser, myPosts, myLikes, isLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <span class="loader"></span>
      </Card>
    );
  }
  return (
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
      <CardMedia
        className="cover-photo"
        sx={{
          height: 140,
          display: "grid",
          backgroundColor: "black",
          justifyContent: "center",
        }}
        image="https://www.xtrafondos.com/wallpapers/twice-dahyun-talk-that-talk-10529.jpg"
      >
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "500",
            color: "white",
            textShadow: "2px 2px 4px black",
            position: "relative",
            alignSelf: "end",
            justifySelf: "center",
          }}
        >
          {currentUser.name.toUpperCase()}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "300",
            color: "white",
            fontSize: "18px",
            top: "0px",
            textShadow: "2px 2px 4px black",
            position: "relative",
            alignSelf: "baseline",
            justifySelf: "center",
          }}
        >
          @ {currentUser.username}
        </Typography>
      </CardMedia>
      <div className="profile-holder">
        <div className="layer1">
          <RaindropIcon className="raindrop"></RaindropIcon>
        </div>
        <div className="layer2">
          <Avatar
            type="button"
            sx={{
              height: "85px",
              width: "85px",
              border: "solid",
              borderWidth: 5,
              bordercolor: "white",
            }}
          >
            <img
              className="profile-picture-card"
              src={currentUser.profilePicture}
            />
          </Avatar>
        </div>
      </div>
      <Divider variant="middle" sx={{ color: "white" }} />
      <CardContent>
        <Grid
          container
          xs={12}
          sx={{
            display: "flex",
            justifyItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              color: "white",
              display: "grid",
              justifyItems: "center",
            }}
          >
            <div className="count">{myPosts.length}</div>
            <div className="counted">posts</div>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              color: "white",
              display: "grid",
              justifyItems: "center",
            }}
          >
            <div className="count">{myLikes.length}</div>
            <div className="counted">likes</div>
          </Grid>
        </Grid>
      </CardContent>
      <Divider variant="middle" sx={{ color: "white" }} />
      <CardContent>
        <MenuList xs={12}>
          <MenuItem
            xs={12}
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "700",
              color: "white",
            }}
          >
            Feed
          </MenuItem>
          <MenuItem
            xs={12}
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "300",
              color: "white",
            }}
          >
            My Posts
          </MenuItem>
          <MenuItem
            xs={12}
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "300",
              color: "white",
            }}
          >
            Liked Posts
          </MenuItem>
          <MenuItem
            xs={12}
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "300",
              color: "white",
            }}
          >
            Profiles
          </MenuItem>
          <MenuItem
            xs={12}
            sx={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "300",
              color: "white",
            }}
          >
            My Photos
          </MenuItem>
        </MenuList>
      </CardContent>
      <CardActions xs={12}>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          sx={{
            borderRadius: "1000px",
            margin: "7px",
            backgroundColor: "#1b8b97",
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "700",
            padding: "5px",
            "&:hover": { backgroundColor: "#074147" },
          }}
        >
          View My Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomeProfileCard;

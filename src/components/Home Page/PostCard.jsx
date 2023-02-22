import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Avatar } from "@mui/material";
import { ReactComponent as RaindropIcon } from "../Raindrop.svg";
import "./PostCard.css";

const PostCard = ({ post, isLoading }) => {
  function time_ago(time) {
    switch (typeof time) {
      case "number":
        break;
      case "string":
        time = +new Date(time);
        break;
      case "object":
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, "s", 1], // 60
      [120, "1 m ago", "1 m from now"], // 60*2
      [3600, "m", 60], // 60*60, 60
      [7200, "1 h ago", "1 h from now"], // 60*60*2
      [86400, "h", 3600], // 60*60*24, 60*60
      [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
      [604800, "d", 86400], // 60*60*24*7, 60*60*24
      [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
      [2419200, "w", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "Last mth", "Next mth"], // 60*60*24*7*4*2
      [29030400, "mth", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Last yr", "Next yr"], // 60*60*24*7*4*12*2
      [2903040000, "yrs", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
      [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = "ago",
      list_choice = 1;

    if (seconds == 0) {
      return "Just now";
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = "from now";
      list_choice = 2;
    }
    var i = 0,
      format;
    while ((format = time_formats[i++]))
      if (seconds < format[0]) {
        if (typeof format[2] == "string") return format[list_choice];
        else
          return (
            Math.floor(seconds / format[2]) + " " + format[1] + " " + token
          );
      }
    return time;
  }

  return (
    <Card
      xs={12}
      sx={{
        borderRadius: "40px",
        paddingBottom: "3vh",
        boxShadow: "none",
        margin: "1vw",
        marginTop: "2vh",
        display: "grid",
      }}
    >
      {post.postPicture !== null && post.postPicture !== "" && (
        <div style={{ position: "relative" }}>
          <CardMedia
            component="img"
            sx={{ objectFit: "cover" }}
            image={post.postPicture}
          />
          <div
            style={{
              fontFamily: "Raleway, Arial, Helvetica, sans-serif",
              fontWeight: "300",
              color: "white",
              textShadow: "2px 1px 6px black",
              position: "absolute",

              top: 10,
              left: "0%",
              transform: "translateX(50%)",
              zIndex: "100",
              textJustify: "baseline",
            }}
          >
            {time_ago(new Date(post.createdAt))}
          </div>
        </div>
      )}
      <CardContent>
        <div className="p-profile-holder2">
          <div className="p-layer3">
            <RaindropIcon className="p-raindrop2"></RaindropIcon>
          </div>
          <div className="p-layer4">
            <Avatar
              className="p-avatar"
              type="button"
              sx={{
                height: "55px",
                width: "55px",
                border: "solid",
                borderWidth: 3,
                bordercolor: "white",
              }}
            >
              <img
                className="p-profile-picture-card2"
                src={post.user.profilePicture}
              />
            </Avatar>
          </div>
          <div className="p-layer5">{post.user.name}</div>
          <div className="p-layer6">@ {post.user.username}</div>
        </div>

        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;

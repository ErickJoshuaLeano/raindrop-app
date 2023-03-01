import { Card, Divider, Fade, Typography, useTheme } from "@mui/material";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const LatestCard = ({ posts }) => {
  const theme = useTheme();
  const filter = posts.filter(
    (posts) => posts.postPicture === null || posts.postPicture === ""
  );

  const textPosts = filter.slice(0, 10);

  return (
    <Fade in timeout={1000} style={{ transitionDelay: "700ms" }}>
      <Card
        xs={12}
        sx={{
          borderRadius: "40px",
          paddingBottom: "3vh",
          boxShadow: "none",
          margin: "0.5vw",
          display: "grid",
          backgroundColor: theme.palette.card.main,
        }}
      >
        {" "}
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
          <NewspaperOutlinedIcon sx={{ alignSelf: "center" }} />
          <div className="spacer"></div>Feed
        </Typography>
        <Divider variant="middle" />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
          }}
        >
          {textPosts.map((text) => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={text.user.profilePicture}
                  sx={{
                    border: "solid",
                    borderColor: theme.palette.profileHolder.main,
                    borderWidth: "3px",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                sx={{
                  display: "inline",
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "700",
                  fontSize: "13px",
                  color: theme.palette.mainText.main,
                }}
                primary={text.user.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        display: "block",
                        fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                        fontWeight: "500",
                        color: theme.palette.mainText.light,
                      }}
                      component="span"
                      variant="body2"
                      color="grey"
                    >
                      {text.body}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Fade>
  );
};

export default LatestCard;

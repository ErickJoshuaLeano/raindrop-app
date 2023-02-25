import { Card, CardMedia, Typography } from "@mui/material";
import React from "react";

const CoverCard = ({ otherUser }) => {
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
      <Grid container>
        <Grid item></Grid>
        <Grid item>
          <div>
            {otherUser.coverPicture && otherUser.coverPicture !== "" ? (
              <CardMedia
                type="button"
                // onClick={handleClickOpen}
                className="cover-photo"
                sx={{
                  height: 140,
                  display: "grid",
                  backgroundColor: "grey",
                  justifyContent: "center",
                }}
                image={otherUser.coverPicture}
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
                  {otherUser.name.toUpperCase()}
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
                  @ {otherUser.username}
                </Typography>
              </CardMedia>
            ) : (
              <CardMedia
                type="button"
                // onClick={handleClickOpen}
                className="cover-photo"
                sx={{
                  height: 140,
                  display: "grid",
                  backgroundColor: "#cecece",
                  justifyContent: "center",
                  "&:hover": { backgroundColor: "#074147", transition: "0.5s" },
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  align="center"
                  sx={{
                    fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                    fontWeight: "100",
                    color: "white",
                    position: "relative",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                >
                  Add Cover Photo
                </Typography>
              </CardMedia>
            )}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CoverCard;

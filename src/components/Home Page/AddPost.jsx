import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Avatar,
  CardMedia,
  Divider,
  Grid,
  InputBase,
  TextField,
} from "@mui/material";
import * as authService from "../../services/auth";
import { ReactComponent as RaindropIcon } from "../Raindrop.svg";
import "./AddPost.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const AddPost = () => {
  const currentUser = authService.getCurrentUser();
  return (
    <Card
      xs={12}
      sx={{
        borderRadius: "40px",
        boxShadow: "none",
        margin: "0.5vw",
        marginBlock: "1vw",
      }}
    >
      <CardMedia
        sx={{ height: "34px", backgroundColor: "#cecece", display: "grid" }}
      >
        {" "}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "500",
            color: "#5a5a5a",
            fontSize: "15px",
            right: "20px",
            position: "relative",
            alignSelf: "end",
            justifySelf: "end",
          }}
        >
          <div className="drop-a-thought">Drop a thought</div>
        </Typography>
      </CardMedia>
      <div className="profile-holder2">
        <div className="layer3">
          <RaindropIcon className="raindrop2"></RaindropIcon>
        </div>
        <div className="layer4">
          <Avatar
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
              className="profile-picture-card2"
              src={currentUser.profilePicture}
            />
          </Avatar>
        </div>
        <div className="layer5">{currentUser.name}</div>
        <div className="layer6">@ {currentUser.username}</div>
      </div>
      <CardContent xs={12}>
        <Grid container>
          <Grid item xs={7} sm={6} md={8}>
            <Box>
              <InputBase
                multiline
                fullWidth
                sx={{
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                }}
                placeholder="Say Something"
              />
            </Box>
          </Grid>
          <Grid xs={5} sm={6} md={4} item>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignContent="baseline"
            >
              <Button
                className="add-photo-button"
                variant="contained"
                startIcon={<DeleteIcon />}
                disableElevation
                fullWidth
                sx={{
                  borderRadius: "1000px",
                  margin: "7px",
                  color: "grey",
                  backgroundColor: "#eaebef",
                  fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                  fontWeight: "700",
                  padding: "5px",
                  "&:hover": { backgroundColor: "#074147", color: "white" },
                }}
              >
                <div className="button-text">Add Photo</div>
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          sx={{ color: "#cecece", borderBottomWidth: 2 }}
        />
      </CardContent>
      <Box display="flex" justifyContent="center" alignContent="baseline">
        <Button
          className="add-photo-button"
          variant="contained"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          disableElevation
          sx={{
            width: "100px",
            padding: "10px",
            borderRadius: "1000px",
            margin: "7px",
            backgroundColor: "#84e7b3",
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "700",
            padding: "5px",
            "&:hover": { backgroundColor: "#074147" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
};

export default AddPost;

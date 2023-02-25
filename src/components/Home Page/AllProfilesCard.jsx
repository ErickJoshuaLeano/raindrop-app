import { Button, Card, Fade, Typography } from "@mui/material";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";

const AllProfilesCard = () => {
  return (
    <Fade in timeout={1000} style={{ transitionDelay: "800ms" }}>
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
        {" "}
        <Button
          variant="contained"
          disableElevation
          sx={{
            width: "94.5%",
            borderRadius: "1000px",
            margin: "7px",
            backgroundColor: "#1b8b97",
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            fontWeight: "700",
            padding: "5px",
            "&:hover": { backgroundColor: "#074147" },
          }}
        >
          <GroupIcon />
          View All Profiles
        </Button>
      </Card>
    </Fade>
  );
};

export default AllProfilesCard;
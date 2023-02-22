import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import * as authService from "../services/auth";
import {
   Card
  ,Button
  ,CardActions
  ,CardContent
  ,Grid
  ,TextField
  ,Typography
  ,Box
  ,Avatar
  ,Stack
  ,Divider
  ,LocationOn
  ,Item
  ,Popover
} from "@mui/material";
import Spinner from "./Spinner";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import AddComment from "../experimental/AddComment";

const PostDetailsPage = () => {
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    window.location.reload(false);
    navigate("/login");
  };

  const handleComment = () => {
    alert("comment update ongoing");
    navigate("/commentdemo");
  };

  const handleLike = () => {
    alert("thanks for liking");
    
  };
  
  return (
    <>
      <NavBar onLogout={handleLogout} />
      <div>Test Area for Post</div>
      <Card>
        <Box sx={{ p: 2, display: 'flex' }}>
          <Avatar variant="rounded" src="https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds" />
          <Typography fontWeight={700}>
            A post title.
          </Typography>
        </Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          >
          <ThumbUpAltIcon></ThumbUpAltIcon>
          <Button onClick={handleLike}>like</Button>
          <CommentIcon></CommentIcon>
          <Button onClick={handleComment}>comment</Button>
        </Stack>
      </Card>   
    </>
  );
};

export default PostDetailsPage

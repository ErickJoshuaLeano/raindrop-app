import React, { useState, useEffect } from "react";
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
import Spinner from "../experimental/Spinner";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddComment from "../Comments/AddComment";
import * as postService from "../services/post";
import * as commentService from "../services/comment";
import axios from "axios"; 
import { useParams } from "react-router-dom";

const PostDetailsPage = () => {
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const navigate = useNavigate();

// updates for add comment>>
  const params = useParams();
    
  const [posts, setPosts] = useState([]);
  
      useEffect(()=> {
          axios.get(`http://localhost:3000/postdetails/${params.postId}`)
          .then(res => {
              console.log(res)
              setPosts(res.data)
          })
          .catch(err =>{
              console.log(err)
          })
      }, [params.postId]);
  
  // const id = {params.postId};

// <<updates for add comnment 

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
            A post title. the postId: {params.postId}
          </Typography>
        </Box>
{/* updates for add comment */}
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>the body: {post.body}</TableCell>
              <TableCell>postId: {post.id}</TableCell>
              <TableCell>postUserId: {post.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.postId}>
              <TableCell>the comment: {comment.body}</TableCell>
              <TableCell>the user: {comment.userId}</TableCell>
            </TableRow>
          ))}
      </TableBody> */}
{/* updates for add comment */}

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

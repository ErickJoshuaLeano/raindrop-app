import React from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts";
import * as postService from "../services/post";

const AddPost = () => {
  const navigate = useNavigate();
  const handleSubmit = (post) => {
    postService
      .addPost(post)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message[0]);
        }
      });
  };

  return (
    <div>
      <Posts onSubmit={handleSubmit} />
    </div>
  );
};

export default AddPost;

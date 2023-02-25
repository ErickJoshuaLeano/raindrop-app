import React from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts";
import * as postService from "../services/posts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPost = () => {
  const navigate = useNavigate();
  const handleSubmit = (post) => {
    postService
      .addPost(post)
      .then((response) => {
        console.log(response);
        // window.location.reload(false);
        navigate("/home");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message[0]);
        }
      });
  };

  return (
    <div>
      <Posts onSubmit={handleSubmit} onClick={handleSubmit} />
      <ToastContainer />
    </div>
  );
};

export default AddPost;

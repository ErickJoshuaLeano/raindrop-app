import { Grid } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";
import Masonry from "@mui/lab/Masonry/Masonry";

const PostCardGrid = ({
  posts,
  isLoading,
  onDeletePost,
  onAddLikePost,
  onDeleteLike,
  currentUser,
  onSubmitComment,
  updatePage,
  setUpdatePage,
  columns,
}) => {
  return (
    <div className="image-grid">
      <Grid container xs={12}>
        <Masonry columns={columns} spacing={0}>
          {posts.map((post) => (
            <PostCard
              currentUser={currentUser}
              post={post}
              key={post.id}
              isLoading={isLoading}
              onDeletePost={onDeletePost}
              onAddLikePost={onAddLikePost}
              onDeleteLike={onDeleteLike}
              onSubmitComment={onSubmitComment}
              updatPage={updatePage}
              setUpdatePage={setUpdatePage}
            />
          ))}
        </Masonry>
      </Grid>
    </div>
  );
};

export default PostCardGrid;

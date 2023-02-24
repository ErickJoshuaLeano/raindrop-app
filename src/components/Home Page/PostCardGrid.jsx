import { Grid, TableBody, TableRow } from "@mui/material";
import React, { useState } from "react";
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
        {/* <Grid container xs={12}>
        {posts.map((post) => (
          <Grid item xs={cardSize}>
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
          </Grid>
        ))}
      </Grid> */}
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

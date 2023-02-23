import { TableBody, TableRow } from "@mui/material";
import React, { useState } from "react";
import PostCard from "./PostCard";

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
}) => {
  return (
    <div className="image-grid">
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
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
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
};

export default PostCardGrid;

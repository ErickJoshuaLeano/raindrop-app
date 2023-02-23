import { TableBody, TableRow } from "@mui/material";
import React, { useState } from "react";
import PostCard from "./PostCard";

const PostCardGrid = ({ posts, isLoading, onDeletePost }) => {
  return (
    <div className="image-grid">
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <PostCard
              post={post}
              key={post.id}
              isLoading={isLoading}
              onDeletePost={onDeletePost}
            />
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
};

export default PostCardGrid;

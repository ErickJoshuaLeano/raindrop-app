import React from "react";
import PostCard from "./PostCard";

const PostCardGrid = ({ posts, isLoading }) => {
  return (
    <div className="image-grid">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default PostCardGrid;

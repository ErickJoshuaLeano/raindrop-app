import http from "./http";

export function fetchPostById(id) {
  return http.get(`/posts/${id}`);
}

export function fetchCommentsByPostId(postId) {
  return http.get(`/comments/${postId}/comments`);
}

export function addComment(comment) {
  const commentClone = { ...comment };
  Object.keys(commentClone).forEach((key) => {
    if (
      commentClone[key] === "" ||
      commentClone[key] === null ||
      commentClone[key] === undefined
    ) {
      delete commentClone[key];
    }
  });

  return http.post("/comments", commentClone);
}

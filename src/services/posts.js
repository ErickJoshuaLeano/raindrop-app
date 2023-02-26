import http from "./http";

export function fetchPosts() {
  return http.get("/posts");
}

export function fetchComments() {
  return http.get("/comments");
}

export function fetchPostsbyId(id) {
  return http.get(`/posts/${id}`);
}

export function fetchCommentsByPost(id) {
  return http.get(`/posts/${id}/comments`);
}

export function fetchPostsbyUsername(username) {
  return http.get(`/profiles/${username}/posts`);
}

export function fetchPostById(id) {
  return http.get(`/posts/${id}`);
}

export function addPost(post) {
  const postClone = { ...post };
  Object.keys(postClone).forEach((key) => {
    if (
      postClone[key] === "" ||
      postClone[key] === null ||
      postClone[key] === undefined
    ) {
      delete postClone[key];
    }
  });

  return http.post("/posts", postClone);
}

export function addComment(comment, id) {
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

  return http.post(`/posts/${id}/comments`, commentClone);
}

export function updatePost(id, post) {
  const postClone = { ...post };
  Object.keys(postClone).forEach((key) => {
    if (
      postClone[key] === "" ||
      postClone[key] === null ||
      postClone[key] === undefined
    ) {
      delete postClone[key];
    }
  });
  return http.put(`/posts/${id}`, postClone);
}

export function updateComment(id, comment, commentId) {
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
  return http.put(`/posts/${id}/comments/${commentId}`, commentClone);
}

export function deletePost(id) {
  return http.delete(`/posts/${id}`);
}

export function deleteComment(postId, commentId) {
  return http.delete(`/posts/${postId}/comments/${commentId}`);
}

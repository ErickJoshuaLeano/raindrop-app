import http from "./http";

export function addPostLike(postId) {
  return http.post("/likes", { postId });
}

export function deleteLike(id) {
  return http.delete(`/likes/${id}`);
}

export function addCommentLike(commentId) {
  return http.post("/likes", { commentId });
}

export function fetchLikes() {
  return http.get("/likes");
}

export function fetchLiked() {
  return http.get("/likes/user");
}

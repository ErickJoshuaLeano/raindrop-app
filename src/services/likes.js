import http from "./http";

export function addPostLike(postId) {
  return http.post("/likes", { postId });
}

export function deleteLike(id) {
  return http.delete(`/likes/${id}`);
}

import http from "./http";

export function fetchPosts() {
  return http.get("/posts");
}

export function fetchPostsbyId(id) {
  return http.get(`/posts/${id}`);
}

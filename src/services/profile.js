import http from "./http";

export function fetchPostsbyUsername(username) {
  return http.get(`/profiles/${username}/posts`);
}

export function fetchLikesbyUsername(username) {
  return http.get(`/profiles/${username}/likes`);
}

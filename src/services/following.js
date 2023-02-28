import http from "./http";

export function addFollowing(followingId) {
  return http.post("/following", { followingId });
}

export function getFollowing(userId) {
  return http.get("/following/all", { userId });
}

export function deleteFollowing(id) {
  return http.delete(`/following/${id}`);
}

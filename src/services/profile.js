import http from "./http";

export function fetchPostsbyUsername(username) {
  return http.get(`/profiles/${username}/posts`);
}

export function fetchUserbyUsername(username) {
  return http.get(`/profiles/${username}`);
}

export function searchUsers(searchQuery) {
  return http.get(`/profiles/search/${searchQuery}`);
}

export function fetchCurrentUser() {
  return http.get(`/users/me`);
}

export function fetchLikesbyUsername(username) {
  return http.get(`/profiles/${username}/likes`);
}

export function updateProfile(user) {
  const userClone = { ...user };
  Object.keys(userClone).forEach((key) => {
    if (
      userClone[key] === "" ||
      userClone[key] === null ||
      userClone[key] === undefined
    ) {
      delete userClone[key];
    }
  });
  return http.patch(`/users/`, userClone);
}

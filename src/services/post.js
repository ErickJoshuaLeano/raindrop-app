import http from "./http";

export function fetchPost() {
  return http.get("/posts");
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
export function deletePost(id) {
  return http.delete(`/posts/${id}`);
}

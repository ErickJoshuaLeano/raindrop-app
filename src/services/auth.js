import jwtDecode from "jwt-decode";
import http from "./http";

export function register(name, email, username, password, confirmPassword) {
  return http.post("/users", {
    name,
    email,
    username,
    password,
    confirmPassword,
  });
}

export function login(username, password) {
  return http.post("/auth", { username, password });
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    return decoded;
  }
  return null;
}

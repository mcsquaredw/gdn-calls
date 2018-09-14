import axios from "axios";

export async function isAuthenticated() {
  return true;
}

export async function attemptLogin(username, password) {
  axios.post("/api/login");
}

export async function logout() {}

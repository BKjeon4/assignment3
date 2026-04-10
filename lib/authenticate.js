import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function readToken() {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password: password }),
  });

  if (res.status === 200) {
    const data = await res.json();
    setToken(data.token);
    return true;
  } else {
    const data = await res.json();
    throw new Error(data.message);
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password: password, password2: password2 }),
  });

  if (res.status === 200) {
    return true;
  } else {
    const data = await res.json();
    throw new Error(data.message);
  }
}
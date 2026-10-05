import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async ({ username, password }) => {
  const response = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 30,
  });

  return response.data;
};

export const registerUser = async (userData) => {
  // Demo-only: DummyJSON's user creation endpoint
  // simulates account creation; it does not create
  // a persistent account usable for subsequent login.
  const response = await api.post("/users/add", {
    firstName: userData.name,
    email: userData.email,
    username: userData.username,
    password: userData.password,
  });

  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

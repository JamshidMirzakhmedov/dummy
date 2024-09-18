import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = (skip: number, limit: number) => {
  return axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
};

export const getUsers = () => {
  return api.get("/users");
};

export const getPosts = () => {
  return api.get("/posts");
};

export const getTodos = () => {
  return api.get("/todos");
};

// Function to login the user
export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 30,
  });
  return response.data; // Return the token and refreshToken
};

// Function to fetch the current user
export const fetchCurrentUser = async (token: string) => {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to refresh the session
export const refreshSession = async (refreshToken: string) => {
  const response = await api.post("/auth/refresh", {
    refreshToken,
    expiresInMins: 30,
  });
  return response.data;
};

import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = (skip: number, limit: number) => {
  return api.get(`/products?limit=${limit}&skip=${skip}`);
};

export const getProductDetails = (id: string) => {
  return api.get(`/products/${id}`);
};

export const getUsers = () => {
  return api.get("/users");
};

export const getUserById = (id: string) => {
  return api.get(`/users/${id}`);
};

export const getPosts = () => {
  return api.get("/posts");
};

export const getTodos = () => {
  return api.get("/todos");
};

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 30,
  });
  return response.data;
};

export const fetchCurrentUser = async (token: string) => {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const refreshSession = async (refreshToken: string) => {
  const response = await api.post("/auth/refresh", {
    refreshToken,
    expiresInMins: 30,
  });
  return response.data;
};

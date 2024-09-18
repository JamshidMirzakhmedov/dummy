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

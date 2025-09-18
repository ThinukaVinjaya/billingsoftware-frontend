// src/Service/UserService.js
import axios from "axios";

// Centralize the base URL to avoid typos later
const BASE_URL = "http://localhost:8080/api/v1.0/admin";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addUser = async (user) => {
  return await axios.post(`${BASE_URL}/register`, user, authHeader());
};

export const deleteUser = async (id) => {
  return await axios.delete(`${BASE_URL}/users/${id}`, authHeader());
};

export const fetchUsers = async () => {
  return await axios.get(`${BASE_URL}/users`, authHeader());
};

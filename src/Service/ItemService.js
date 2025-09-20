
import axios from "axios";

// ✅ Base URL
const BASE_URL = "http://localhost:8080/api/v1.0/admin";

// ✅ Auth headers helper
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ✅ Add a new item
export const addItem = async (item) => {
  return await axios.post(`${BASE_URL}/items`, item, authHeader());
};

// ✅ Delete an item
export const deleteItem = async (itemId) => {
  return await axios.delete(`${BASE_URL}/items/${itemId}`, authHeader());
};

// ✅ Fetch all items
export const fetchItems = async () => {
  return await axios.get(`${BASE_URL}/items/all`, authHeader());
};

import axios from "axios";

// ✅ Create a reusable axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1.0",
  // withCredentials: true, // enable this if you are using cookies
});

// ✅ Add an interceptor to include Authorization header automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get latest orders
export const latestOrders = async () => {
  try {
    const { data } = await api.get("/orders/latest");
    return data;
  } catch (error) {
    console.error("Error fetching latest orders:", error.response || error);
    throw error.response || error;
  }
};

// ✅ Create an order
export const createOrder = async (order) => {
  try {
    const { data } = await api.post("/orders", order);
    return data;
  } catch (error) {
    console.error("Error creating order:", error.response || error);
    throw error.response || error;
  }
};

// ✅ Delete an order
export const deleteOrder = async (id) => {
  try {
    const { data } = await api.delete(`/orders/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting order:", error.response || error);
    throw error.response || error;
  }
};

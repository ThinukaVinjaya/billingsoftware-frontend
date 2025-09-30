import axios from "axios";

// ✅ Base URL
const BASE_URL = "http://localhost:8080/api/v1.0";

// ✅ Auth headers helper
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
};

// ✅ Fetch dashboard data
export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard`, authHeader());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
};

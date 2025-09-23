import axios from "axios"

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createRazorpayOrder = async (data) => {
    return await axios.post("http://localhost:8080/api/v1.0/payments/create-order", data, authHeader());
}

export const verifyPayment = async(paymentData) => {
     return await axios.post('http://localhost:8080/api/v1.0/payments/verify', paymentData, authHeader());
}
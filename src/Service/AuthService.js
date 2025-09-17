import axios from 'axios';

export const loginUser = (data) => {
  return axios.post('http://localhost:8080/api/v1.0/login', data);
};

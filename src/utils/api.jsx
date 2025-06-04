// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", 
//   withCredentials: true, 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // This is crucial for sending cookies
});

// Add request interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;

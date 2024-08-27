import axios from "axios";
// import Cookies from 'js-cookie';
// import { cookies } from 'next/headers'

export const apiClient = axios.create({
  baseURL: "https://sandbox.pluzz.co.mz/api",
  headers: {
    'Content-Type': 'application/json'
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     // const cookieStore = cookies()
//     // const token = cookieStore.get('authToken')?.value;

//     const token = Cookies.get("authToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       config.headers.Cookie = `GDB=${token}`;
//     };

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
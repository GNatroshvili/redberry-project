import axios from "axios";

const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 9e806dd9-b975-4ea0-aa15-85aea683b069`,
  },
  withCredentials: true,
});

export default api;

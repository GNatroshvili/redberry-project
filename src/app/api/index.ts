import axios from "axios";
import { AUTH_TOKEN } from "../constants";

const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    Authorization: AUTH_TOKEN,
  },
});

export default api;

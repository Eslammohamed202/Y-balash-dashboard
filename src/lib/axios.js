import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.PROD
    // ? "https://y-balash.vercel.app/api" 
    ? "https://y-balash.vercel.app/api"
    : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

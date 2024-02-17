import axios from "axios";

const api = axios.create({
  baseURL: "www.themealdb.com/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;

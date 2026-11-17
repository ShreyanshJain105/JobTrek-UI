import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let interceptorId: number | null = null;

export const setupResponseInterceptor = (navigate: any) => {
  if (interceptorId !== null) {
    axiosInstance.interceptors.response.eject(interceptorId);
  }
  interceptorId = axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          navigate("/login");
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;

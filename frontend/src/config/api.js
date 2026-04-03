import axios from "axios";

// Determine the correct API URL
const getApiUrl = () => {
  // Production on Vercel
  if (import.meta.env.PROD) {
    return "https://video-editing-portfolio-m27y.onrender.com/api";
  }
  // Development
  return "/api";
};

const API_URL = getApiUrl();

console.log("API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(
      `📤 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    );
    return config;
  },
  (error) => {
    console.error("📤 API Request Error:", error);
    return Promise.reject(error);
  },
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(
      "📥 API Response Error:",
      error.response?.status,
      error.message,
    );
    console.error("URL:", error.config?.url);
    console.error("BaseURL:", error.config?.baseURL);
    return Promise.reject(error);
  },
);

export default api;

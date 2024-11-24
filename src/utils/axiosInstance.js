import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 20000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        switch (status) {
            case 401:
                console.error("Unauthorized - redirecting to login");
                break;
            case 500:
                console.error("Server error - please try again later");
                break;
            case 404:
                console.error("Requested resource not found");
                break;
            case 403:
                console.error("Forbidden - you don't have permission");
                break;
            default:
                console.error("An unexpected error occurred:", error);
                break;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 10000,
});

//Request interceptor for adding the Authorization token
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

//Response Interceptor for centralized error handling
axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        const status = error.response?.status;
        if (status === 401) {
            console.error("Unauthorized - redirecting to login");
            // Optionally, you can add logic here to log out the user
            // and redirect to the login page
          } else if (status === 500) {
            console.error("Server error - please try again later");
          } else if (status === 404) {
            console.error("Requested resource not found");
          } else if (status === 403) {
            console.error("Forbidden - you don't have permission");
          } else {
            console.error("An unexpected error occurred:", error);
          }
          
        return Promise.reject(error);
    }

)

export default axiosInstance;
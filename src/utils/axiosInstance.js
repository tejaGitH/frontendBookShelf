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

//Response Interceptor for centra;ized error handling
axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        const status = error.response?.status;
        if(status ===401){
            console.error("Unauthorized -redirecting to login");
        }else if(status === 500){
            console.error("server error");
        }
        return Promise.reject(error);
    }

)

export default axiosInstance;
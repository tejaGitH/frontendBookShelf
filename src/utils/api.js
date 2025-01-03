import axios from 'axios';
import Cookies from 'js-cookie';

const backendUrl =process.env.REACT_APP_BACKEND_URL;

// Set up an Axios instance
const api = axios.create({
    baseURL: `${backendUrl}/api`, // Your API base URL
    withCredentials :true,
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
    const token = localStorage.getitem('token');
    //const token = Cookies.get('token'); // Retrieve the token from cookies
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Include the token in Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Now you can use this api instance for requests
export default api;
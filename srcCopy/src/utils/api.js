import axios from 'axios';
import Cookies from 'js-cookie';

// Set up an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Your API base URL
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
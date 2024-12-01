import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 20000,
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('Access Token:', token);
        console.log('Refresh Token:', refreshToken);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isTokenExpired(localStorage.getItem('token'))) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const refreshToken = localStorage.getItem('refreshToken');

                    try {
                        const response = await axios.post('http://localhost:3000/api/auth/refresh', { token: refreshToken });
                        const { token: newToken, refreshToken: newRefreshToken } = response.data;
                        localStorage.setItem('token', newToken);
                        localStorage.setItem('refreshToken', newRefreshToken); // Ensure this is updated
                        isRefreshing = false;
                        onRefreshed(newToken);
                        refreshSubscribers = [];
                    } catch (err) {
                        console.error('Error refreshing token:', err);
                        window.location.href = '/login';
                        return Promise.reject(err);
                    }
                }

                const retryOriginalRequest = new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosInstance(originalRequest));
                    });
                });

                return retryOriginalRequest;
            }
        }

        return Promise.reject(error);
    }
);

function isTokenExpired(token) {
    if (!token) return true;
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(atob(payload));
    return Date.now() >= exp * 1000;
}

export default axiosInstance;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// API URL for your backend
const API_URL = "http://localhost:3000/users";

// Login action
export const login = createAsyncThunk('users/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, {
            withCredentials: true // This ensures that cookies are sent along with the request
        });

        const { success, user, token, refreshToken } = response.data; // Extract user, token, and refreshToken from the response

        if (!token || !refreshToken || !user) {
            // If the response does not include the required token, refreshToken, or user, reject the action
            return rejectWithValue("Invalid response format");
        }
        console.log('Token:', token);
        console.log('Refresh Token:', refreshToken);
        console.log(JSON.stringify(user));
        
        // Store user data, token, and refreshToken in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userInfo', JSON.stringify(user));

        // Return the user, token, and refreshToken to the Redux store
        return { user, token, refreshToken };

    } catch (error) {
        console.log("Login error:", error); // Log any errors for debugging
        
        // Check if the error has a response
        if (error.response) {
            // Server responded with a status code other than 2xx
            return rejectWithValue(error.response.data.message || 'Login failed');
        } else if (error.request) {
            // Request was made but no response received
            return rejectWithValue('No response from server');
        } else {
            // Something happened in setting up the request
            return rejectWithValue(error.message);
        }
    }
});

// Register action
export const register = createAsyncThunk('users/register', async ({ username, email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, email, password });
        return response.data; // Assuming the response contains user data
    } catch (error) {
        return rejectWithValue(error.response?.message || 'Registration failed');
    }
});

// Logout action
export const logout = createAsyncThunk('users/logout', async () => {
    await axios.post(`${API_URL}/logout`, null, {
        withCredentials: true,
    });
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    return true;
});

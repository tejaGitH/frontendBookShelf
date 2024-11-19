import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//reducers handles state

const API_URL= "http://localhost:3000/users";
// Login action
export const login = createAsyncThunk('users/login', async ({ email, password },{rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, {
           withCredentials: true // This ensures that cookies are sent along with the request
        });
  
        const { suscess, user } = response.data; // Extract user and token from the response
        let token = user && user.token;
  
        if (!token || !user) {
           // If the response does not include the required token or user, reject the action
           return rejectWithValue("Invalid response format");
        }
        console.log('token',token);
        console.log(JSON.stringify(user));
        // Store user data and token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(user));
  
        // Return the user and token to the Redux store
        return { user, token };
  
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
 
 
    // const response = await axios.post('/api/login', { email, password });
    // console.log("userActions",response.data);
    // return response.data;  // Assuming the response contains user data
    
});

// Register action
export const register = createAsyncThunk('users/register', async ({ username, email, password}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, email, password });
        return response.data; // Assuming the response contains user data
    } catch (error) {
        // throw error.response ? error.response.data : error.message;
        return rejectWithValue(error.response?.message || 'Registration failed');
    }
});

// Logout action
export const logout = createAsyncThunk('users/logout', async () => {
    await axios.post(`${API_URL}/logout`, null,{
        withCredentials: true,
    });
    //clear localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    return true;
});





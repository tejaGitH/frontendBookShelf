import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//reducers handles state

const API_URL= "http://localhost:3000/users";
// Login action
export const login = createAsyncThunk('users/login', async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/login`, { email, password }, {
        withCredentials: true // This ensures that cookies are sent along with the request
      });
      console.log("response",response.data);
      const { success,user} = response.data;
      let token = user && user.token;

      localStorage.setItem('token', token);  // Store token if needed for other actions
      console.log("thunk-token",token,"user",user);
      
    
      return { user, token };
 
    // const response = await axios.post('/api/login', { email, password });
    // console.log("userActions",response.data);
    // return response.data;  // Assuming the response contains user data
    
});

// Register action
export const register = createAsyncThunk('users/register', async ({ email, password }) => {
    const response = await axios.post('/api/register', { email, password });
    return response.data;  // Assuming the response contains user data
});

// Logout action
export const logout = createAsyncThunk('users/logout', async () => {
    await axios.post('/api/logout');
    return true;
});







// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// //set the base url for API
// const API_URL= "http://localhost:3000/users";

// export const login = createAsyncThunk(
//     'users/login',
//     async(credentials)=>{
//         const response = await axios.post(`${API_URL}/login`, credentials,{withCredentials: true});
//         //return response.data;
//        return response.json({"message":"ok"});
//     }
// )

// export const register = createAsyncThunk(
//     'users/register',
//     async(userData)=>{
//         const response = await axios.post(`${API_URL}/register`, userData, {withCredentials: true});
//         return response.data;
//     }
// )

// export const logout = createAsyncThunk(
//     'users/logout',
//     async()=>{
//         await axios.get(`${API_URL}/logout`,{withCredentials:true})
//     }
// )

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../utils/types";
// import axios from "axios";
// import Cookies from "js-cookie";

// // Set the base URL for API
// const API_URL = "http://localhost:3000/users";
// // Action to initiate the login process
// export const login = ({ email, password }) => async (dispatch) => {
//     try {
//         dispatch({ type: LOGIN_REQUEST });

//         const response = await axios.post(`{API_URL}/login`, { email, password });  // Your API endpoint for login 
//         // Assuming the response contains a token, save it in cookies
//         Cookies.set('authToken', response.data.token);

//         // Dispatch success action if login is successful
//         dispatch({
//             type: LOGIN_SUCCESS,
//             payload: response.data,  // Pass the user data or token as payload
//         });
//     } catch (error) {
//         // Dispatch failure action if login fails
//         dispatch({
//             type: LOGIN_FAILURE,
//             payload: error.response ? error.response.data.message : error.message,  // Handle error message
//         });
//     }
// };


// export const login = createAsyncThunk(
//     'users/login',
//     async (credentials,{rejectWithValue}) => {
//         try{
//             const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
//             const {token}= response.data;
//             localStorage.setItem('token',token);
//             return {user:response.data.user, token};

//         }catch(error){
//             return rejectWithValue(error.response?.data || "Faile to login #userActions")
//         }
//         // return {...response.data, success:true}; // Directly return the data from the response
//         //console.log(response.data);
//     }
// );


// export const register = createAsyncThunk(
//     'users/register',
//     async (userData) => {
//         const response = await axios.post(`${API_URL}/register`, userData, { withCredentials: true }); // Fixed URL
//         return response.data; // Return the data from the response
//     }
// );

// export const logout = createAsyncThunk(
//     'users/logout',
//     async () => {
//         await axios.get(`${API_URL}/logout`, { withCredentials: true });
//     }
// );


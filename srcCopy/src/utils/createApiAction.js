import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const createApiAction = (actionType, apiCall)=>{
   return createAsyncThunk(actionType, async(...args)=>{
        try{
            const response = await apiCall(...args);
            console.log('API response:', response);
            return response.data;

        }catch(error){
            console.error('API Call Error:', error);
            // throw error.response ? error.response.data : error.message;
            throw error.response?.data || error.message || 'Unknown error occurred';
        }
    })
}
// export const createApiAction = (actionType, apiCall) =>
//     createAsyncThunk(actionType, async (...args) => {
//       try {
//         console.log('API call initiated'); // Debug log
//         const response = await apiCall(...args);
//         console.log('API response:', response); // Debug log
//         return response.data;
//       } catch (error) {
//         console.error('API Call Error:', error);
//         throw error.response?.data || error.message || 'Unknown error occurred';
//       }
//     });
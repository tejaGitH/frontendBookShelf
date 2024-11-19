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
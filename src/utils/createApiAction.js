import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const createApiAction = (actionType, apiCall)=>{
   return createAsyncThunk(actionType, async(...args)=>{
        try{
            const response = await apiCall(...args);
            return response.data;

        }catch(error){
            throw error.response ? error.response.data : error.message;
        }
    })
}
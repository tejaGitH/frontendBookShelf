import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

//send friend request
export const sendFriendRequest = createAsyncThunk(
    'friendships/sendFriendRequest',
    async(friendId, { rejectWithValue })=>{
        try{
            const response = await axiosInstance.post('/friend-requests',{friendId});
            return response.data;
        }catch(error){
        return rejectWithValue(error.response?.data || 'Failed to send friend request');
     }
    }
)

// Get all friends
export const getFriends = createAsyncThunk(
    'friendships/getFriends',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/friends');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch friends');
      }
    }
  );
  
  // Update friendship status (accept, decline, etc.)
  export const updateFriendshipStatus = createAsyncThunk(
    'friendships/updateFriendshipStatus',
    async ({ friendshipId, status }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.patch('/friendships', { friendshipId, status });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update friendship status');
      }
    }
  );
  
  // Remove a friend
  export const removeFriend = createAsyncThunk(
    'friendships/removeFriend',
    async (friendshipId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/friends/${friendshipId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to remove friend');
      }
    }
  );
  
  // Get updates about friends
  export const getFriendUpdates = createAsyncThunk(
    'friendships/getFriendUpdates',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/friend-updates');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch friend updates');
      }
    }
  );
  
  // Get pending friend requests
  export const getPendingRequests = createAsyncThunk(
    'friendships/getPendingRequests',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/requests');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch pending requests');
      }
    }
  );
import { createAsyncThunk, current } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

//send friend request
export const sendFriendRequest = createAsyncThunk(
    'friendships/sendFriendRequest',
    async({userId,friendId}, { rejectWithValue })=>{
        try{
            const response = await axiosInstance.post('/friendships/friend-requests',{userId, friendId});
            console.log("Sending Friend Request with:", { userId, friendId });
            return response.data;
        }catch(error){
          console.error("Error sending friend request:", error);
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

  //Get available users
  // export const fetchAvailableUsers = createAsyncThunk(
  //   'friendships/fetchAvailableUsers',
  //   async ({ limit = 6, offset = 0,currentUserId }, { rejectWithValue }) => {
  //     try {
  //       const response = await axiosInstance.get(`/friendships/getUsers?limit=${limit}&offset=${offset}`);
  //       const filteredUsers = response.data.filter(user => user._id !== currentUserId)//filter out loggedin user
  //       return filteredUsers;
  //     } catch (error) {
  //       return rejectWithValue(error.response?.data || 'Failed to fetch available users');
  //     }
  //   }
  // );

export const fetchAvailableUsers = createAsyncThunk(
  'friendships/fetchAvailableUsers',
  async ({ limit = 6, offset = 0, currentUserId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/friendships/getUsers?limit=${limit}&offset=${offset}`);
      
      // Filter users by friendship status before returning the data
      const filteredUsers = response.data.filter(user => {
        return user._id !== currentUserId && user.friendshipStatus !== "accepted" && user.friendshipStatus !== "pending";
      });

      return filteredUsers;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch available users');
    }
  }
);
import { createAsyncThunk, current } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

//send friend request

export const sendFriendRequest = createAsyncThunk(
    'friendships/sendFriendRequest',
    async ({ userId, friendId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/friendships/friend-requests', { userId, friendId });
            //console.log("Friend request POST response:", response);  // Log response
            return { friendId, message: response.data.message };
        } catch (error) {
            console.error('Error sending friend request:', error);
            return rejectWithValue(error.response?.data || 'Failed to send friend request');
        }
    }
);


// Get all friends
export const getFriends = createAsyncThunk(
    'friendships/getFriends',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('friendships/friends');
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
        const response = await axiosInstance.patch('friendships/friendships', { friendshipId, status });
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
        const response = await axiosInstance.delete(`friendships/friends/${friendshipId}`);
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
        const response = await axiosInstance.get('friendships/friend-updates');
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
        const response = await axiosInstance.get('friendships/requests');
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

// export const fetchAvailableUsers = createAsyncThunk(
//   'friendships/fetchAvailableUsers',
//   async ({ limit = 5, offset = 0, currentUserId }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`/friendships/getUsers?limit=${limit}&offset=${offset}`);
      
//       // Filter users by friendship status before returning the data
//       const filteredUsers = response.data.filter(user => {
//         return user._id !== currentUserId && user.friendshipStatus !== "accepted" && user.friendshipStatus !== "pending";
//       });

//       return filteredUsers;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch available users');
//     }
//   }
// );

// friendshipActions.js
export const fetchEligibleUsers = createAsyncThunk(
  'friendships/fetchEligibleUsers',
  async ({ limit, offset }, { rejectWithValue }) => {
      try {
          // Log the limit and offset values to ensure they are defined
          console.log('Fetching eligible users with limit:', limit, 'offset:', offset);

          const response = await axiosInstance.get(`friendships/getUsers?limit=${limit}&offset=${offset}`);
          return response.data; // { users, hasMore }
      } catch (error) {
          console.error('Error fetching eligible users:', error);
          return rejectWithValue(error.response?.data || 'Failed to fetch eligible users');
      }
  }
);


// fetchSocialUpdates.js
let isFetching = false;

export const fetchSocialUpdates = createAsyncThunk(
    'friendships/fetchSocialUpdates',
    async (_, { rejectWithValue }) => {
        if (isFetching) return; // Prevent duplicate requests
        isFetching = true;
        try {
            const response = await axiosInstance.get('/friendships/updates');
            isFetching = false;
            console.log('SocialUpdates',response.data);
            return response.data;
        } catch (error) {
            isFetching = false;
            console.error('Error fetching social updates:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch social updates');
        }
    }
);
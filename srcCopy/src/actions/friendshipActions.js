import { createAsyncThunk, current } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

//send friend request

export const sendFriendRequest = createAsyncThunk(
    'friendships/sendFriendRequest',
    async ({ userId, friendId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/friendships/friend-requests', { userId, friendId });
            //console.log("Friend request POST response:", response);  // Log response
            return response.data;
            //  return { friendId, message: response.data.message };
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
        console.log("getFriends", response.data);
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
        console.log("Removing friend with ID (action)", friendshipId);
        const response = await axiosInstance.delete(`friendships/friends/${friendshipId}`);
             //console.log("remove friend", response.data);
        return response.data;
        // console.log("remove friend", response.data);
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
        console.log("getFriendUpdates", response.data);
        return response.data;
      } catch (error) {
        console.log("getFriendsUpdates",error);
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
        console.log("getPendingRequests", response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch pending requests');
      }
    }
  );

  export const getSentRequests = createAsyncThunk(
    'friendships/getSentRequests',
    async (_, { rejectWithValue }) => {
      try { const response = await axiosInstance.get('friendships/sent-requests'); return response.data; } catch (error) { return rejectWithValue(error.response?.data || 'Failed to fetch sent requests'); } }
  )


  export const cancelFriendRequest = createAsyncThunk( 'friendships/cancelFriendRequest', async (requestId, { rejectWithValue }) => { try { const response = await axiosInstance.delete(`friendships/cancel-request/${requestId}`); return response.data; } catch (error) { return rejectWithValue(error.response?.data || 'Failed to cancel friend request'); } } );
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
// export const fetchEligibleUsers = createAsyncThunk(
//   'friendships/fetchEligibleUsers',
//   async ({ limit, offset }, { getState, rejectWithValue }) => {
            // const {friendships} = getState();
            // if(friendships.isFetching) return; //prevent duplicate requests
//       try {
//           // Log the limit and offset values to ensure they are defined
//           console.log('Fetching eligible users with limit:', limit, 'offset:', offset);

//           const response = await axiosInstance.get(`friendships/getUsers?limit=${limit}&offset=${offset}`);
//           return response.data; // { users, hasMore }
//       } catch (error) {
//           console.error('Error fetching eligible users:', error);
//           return rejectWithValue(error.response?.data || 'Failed to fetch eligible users');
//       }
//   }
// );
//import { createAsyncThunk } from "@reduxjs/toolkit";
//import axiosInstance from "../utils/axiosInstance"; // Replace with your Axios instance path

export const fetchEligibleUsers = createAsyncThunk(
  "friendships/fetchEligibleUsers",
  async ({ limit, offset }, {  rejectWithValue }) => {
      //if (friendships.isFetching) return; // Prevent duplicate requests

      try {
          console.log("Fetching eligible users with limit:", limit, "offset:", offset);
          const response = await axiosInstance.get(
              `friendships/getUsers?limit=${limit}&offset=${offset}`
          );
          const { users = [], hasMore = false, total =0 } = response.data || {}; // Ensure structure
          console.log("Eligible users fetched:", { users, hasMore, total });
          return { users, hasMore, total }; // Return formatted payload
      } catch (error) {
          console.error("Error fetching eligible users:", error);
          return rejectWithValue(error.response?.data || "Failed to fetch eligible users");
      }
  }
);

// fetchSocialUpdates.js
export const fetchSocialUpdates = createAsyncThunk(
  'friendships/fetchSocialUpdates',
  async (_, { rejectWithValue }) => {
      try {
          console.log("Fetching social updates...");
          const response = await axiosInstance.get('/friendships/updates');
          console.log('SocialUpdates:', response.data);
          if (Array.isArray(response.data)) {
              return response.data; // Ensure this returns an array
          } else {
              console.error("Expected an array but received:", response.data);
              return rejectWithValue("Unexpected response format");
          }
      } catch (error) {
          console.error('Error fetching social updates:', error);
          return rejectWithValue(error.response?.data || 'Failed to fetch social updates');
      }
  }
);






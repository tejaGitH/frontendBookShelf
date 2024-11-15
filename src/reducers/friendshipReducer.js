import { createSlice } from "@reduxjs/toolkit";
import {
  sendFriendRequest,
  getFriends,
  updateFriendshipStatus,
  removeFriend,
  getFriendUpdates,
  getPendingRequests,
} from "../actions/friendshipActions";

const initialState = {
  friends: [],
  pendingRequests: [],
  friendUpdates: [],
  loading: false,
  error: null,
};

const friendshipSlice = createSlice({
  name: "friendships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Send Friend Request
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, update pendingRequests or friends list after sending request
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send friend request";
      })

      // Get Friends
      .addCase(getFriends.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload; // Set friends list
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch friends";
      })

      // Update Friendship Status
      .addCase(updateFriendshipStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFriendshipStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { friendshipId, status } = action.payload;
        const friendship = state.friends.find((f) => f._id === friendshipId);
        if (friendship) {
          friendship.status = status; // Update status of the friendship
        }
      })
      .addCase(updateFriendshipStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update friendship status";
      })

      // Remove Friend
      .addCase(removeFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = state.friends.filter((friend) => friend._id !== action.payload._id); // Remove friend
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove friend";
      })

      // Get Friend Updates
      .addCase(getFriendUpdates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriendUpdates.fulfilled, (state, action) => {
        state.loading = false;
        state.friendUpdates = action.payload; // Set friend updates
      })
      .addCase(getFriendUpdates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch friend updates";
      })

      // Get Pending Requests
      .addCase(getPendingRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = action.payload; // Set pending requests
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pending requests";
      });
  },
});

export default friendshipSlice.reducer;
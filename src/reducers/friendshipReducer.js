import { createSlice } from "@reduxjs/toolkit";
import {
  sendFriendRequest,
  getFriends,
  updateFriendshipStatus,
  removeFriend,
  getFriendUpdates,
  getPendingRequests,
  fetchEligibleUsers,
  fetchSocialUpdates,
} from "../actions/friendshipActions";

const initialState = {
  friends: [],
  pendingRequests: [],
  friendUpdates: [],
  eligibleUsers: [],
  updates: [],
  sendingRequest: false,
  hasMoreUsers: true, // to track if more users are available
  totalUsers: 0,
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
        state.sendingRequest = true; // Set loading state when request is pending
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.sendingRequest = false; // Reset after success
        state.eligibleUsers = state.eligibleUsers.filter((user) => user._id !== action.payload.friendId);
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.sendingRequest = false; // Reset after failure
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
      })

      // Fetch Eligible Users
      .addCase(fetchEligibleUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEligibleUsers.fulfilled, (state, action) => {
        const { users, hasMore, total } = action.payload;
        state.loading = false;
        state.eligibleUsers = users;
        state.hasMoreUsers = hasMore;
        state.totalUsers = total;
      })
      .addCase(fetchEligibleUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch eligible users";
      })

      // Fetch Social Updates
      .addCase(fetchSocialUpdates.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchSocialUpdates.fulfilled, (state, action) => {
        state.loading = false;
        state.updates = action.payload;
    })
    .addCase(fetchSocialUpdates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
  },
});

export default friendshipSlice.reducer;

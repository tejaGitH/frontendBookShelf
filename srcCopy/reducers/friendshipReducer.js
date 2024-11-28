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
  hasMoreUsers: true,
  hasMore: true,
  totalUsers: 0,
  eligibleUsersLoading: false,
  friendsLoading: false,
  friendUpdatesLoading: false,
  socialUpdatesLoading: false,
  successMessage: '',
  error: null,
};

const friendshipSlice = createSlice({
  name: "friendships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Send Friend Request**
      .addCase(sendFriendRequest.pending, (state) => {
        state.sendingRequest = true;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.sendingRequest = false;
        state.successMessage = 'Friend request sent successfully';
        const friendId = action.payload.friendId;
        state.eligibleUsers = state.eligibleUsers.filter(
          (user) => user._id !== friendId
        );
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.sendingRequest = false;
        state.error = action.payload || "Failed to send friend request";
      })
      .addCase(getFriends.pending, (state) => {
        state.friendsLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.friendsLoading = false;
        state.friends = action.payload.friends;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.friendsLoading = false;
        state.error = action.payload || "Failed to fetch friends";
      })
      .addCase(updateFriendshipStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFriendshipStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { friendshipId, status } = action.payload;
        const friendship = state.friends.find((f) => f._id === friendshipId);
        if (friendship) {
          friendship.status = status;
        }
      })
      .addCase(updateFriendshipStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update friendship status";
      })
      .addCase(removeFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = state.friends.filter(
          (friend) => friend._id !== action.payload._id
        );
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove friend";
      })
      .addCase(getFriendUpdates.pending, (state) => {
        state.friendUpdatesLoading = true;
      })
      .addCase(getFriendUpdates.fulfilled, (state, action) => {
        state.friendUpdatesLoading = false;
        state.friendUpdates = action.payload;
      })
      .addCase(getFriendUpdates.rejected, (state, action) => {
        state.friendUpdatesLoading = false;
        state.error = action.payload || "Failed to fetch friend updates";
      })
      .addCase(getPendingRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = action.payload;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pending requests";
      })
      .addCase(fetchEligibleUsers.pending, (state) => {
        state.eligibleUsersLoading= true;
      })
      .addCase(fetchEligibleUsers.fulfilled, (state, action) => {
        const { users = [], hasMore = false , total=0} = action.payload || {};
        state.eligibleUsers = [...state.eligibleUsers, ...users];
        state.hasMoreUsers = hasMore;
        state.totalUsers = total;
        state.eligibleUsersLoading= false;
      })
      .addCase(fetchEligibleUsers.rejected, (state, action) => {
        state.eligibleUsersLoading= false;
        state.error = action.payload || "Failed to fetch eligible users";
      })
      .addCase(fetchSocialUpdates.pending, (state) => {
        console.log("fetchSocialUpdates pending");
        state.socialUpdatesLoading = true;
      })
      .addCase(fetchSocialUpdates.fulfilled, (state, action) => {
        console.log("fetchSocialUpdates fulfilled");
        const updates = action.payload;
        if (Array.isArray(updates)) {
          state.updates = updates;
          console.log("updated state with social updates:", updates);
        } else {
          console.error("Expected an array for social updates but received:", updates);
        }
        state.socialUpdatesLoading = false;
        // state.updates = action.payload; 
        // state.socialUpdatesLoading = false;
      })
      .addCase(fetchSocialUpdates.rejected, (state, action) => {
        console.log("fetchSocialUpdates rejected");
        state.socialUpdatesLoading = false;
        state.error = action.payload || "Failed to fetch social updates";
      });
  },
});

export default friendshipSlice.reducer;

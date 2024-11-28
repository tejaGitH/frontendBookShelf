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
        state.eligibleUsers = state.eligibleUsers.filter(
          (user) => user._id !== action.payload.friendId
        );
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.sendingRequest = false;
        state.error = action.payload || "Failed to send friend request";
      })

      // **Get Friends**
      .addCase(getFriends.pending, (state) => {
        state.friendsLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.friendsLoading = false;
        state.friends = action.payload.friends;
        state.hasMore = action.payload.hasMore; // Update general pagination for friends
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.friendsLoading= false;
        state.error = action.payload || "Failed to fetch friends";
      })

      // **Update Friendship Status**
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

      // **Remove Friend**
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

      // **Get Friend Updates**
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

      // **Get Pending Requests**
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

      // **Fetch Eligible Users**
      // .addCase(fetchEligibleUsers.pending, (state) => {
      //   state.isFetching = true; // Distinguish this from `loading` for clarity
      // })
      // .addCase(fetchEligibleUsers.fulfilled, (state, action) => {
      //   const { users, hasMore, total } = action.payload;
      //   state.isFetching = false;
      //   state.eligibleUsers = [...state.eligibleUsers, ...users]; // Append to current list
      //   state.hasMoreUsers = hasMore; // Pagination for eligible users
      //   state.totalUsers = total;
      // })
      // .addCase(fetchEligibleUsers.rejected, (state, action) => {
      //   state.isFetching = false;
      //   state.error = action.payload || "Failed to fetch eligible users";
      // })
  // **Fetch Eligible Users**
.addCase(fetchEligibleUsers.pending, (state) => {
  // state.isFetching = true;
  state.eligibleUsersLoading= true;
})
.addCase(fetchEligibleUsers.fulfilled, (state, action) => {
  const { users = [], hasMore = false } = action.payload || {}; // Fallback values
  // state.isFetching = false;
  state.eligibleUsers = [...state.eligibleUsers, ...users]; // Append users
  state.hasMoreUsers = hasMore; // Update pagination state
  state.eligibleUsersLoading= false;
})
.addCase(fetchEligibleUsers.rejected, (state, action) => {
  // state.isFetching = false;
  state.eligibleUsersLoading= false;
  state.error = action.payload || "Failed to fetch eligible users";
})
      // **Fetch Social Updates**
      .addCase(fetchSocialUpdates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSocialUpdates.fulfilled, (state, action) => {
        state.loading = false;
        state.updates = action.payload;
      })
      .addCase(fetchSocialUpdates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch social updates";
      });
  },
});

export default friendshipSlice.reducer;
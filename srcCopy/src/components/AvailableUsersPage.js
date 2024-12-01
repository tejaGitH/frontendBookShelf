import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEligibleUsers, sendFriendRequest } from "../actions/friendshipActions";
import { useLocation, useNavigate } from "react-router-dom"; 

const AvailableUsersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { availableUsers, loading, error, hasMoreUsers } = useSelector(
    (state) => state.friendships
  );
  const { userInfo } = useSelector((state) => state.users);

  const [offset, setOffset] = useState(0);
  const limit = 6; // Number of users per batch

  useEffect(() => {
    if (location.pathname === "/available-users") {
      dispatch(fetchEligibleUsers({ limit, offset, currentUserId: userInfo._id }));
    }
  }, [dispatch, offset, location.pathname, userInfo._id]);

  const filteredUsers = availableUsers.filter(user => {
    return user.friendshipStatus !== "accepted" && user.friendshipStatus !== "pending";
  });

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleSendFriendRequest = (friendId) => {
    if (!userInfo?.id || !friendId) {
      console.error("Invalid user or friend ID");
      return;
    }

    // Optimistic update
    const updatedUsers = availableUsers.filter(user => user._id !== friendId);
    dispatch({ type: 'friendships/setAvailableUsers', payload: updatedUsers });

    dispatch(sendFriendRequest({ userId: userInfo.id, friendId }))
      .then(() => {
        dispatch(fetchEligibleUsers({ limit, offset, currentUserId: userInfo.id }));
      })
      .catch(error => {
        console.error("Error sending friend request:", error);
        // Rollback if necessary
        dispatch({ type: 'friendships/setAvailableUsers', payload: availableUsers });
      });
  };

  if (loading && offset === 0) return <div>Loading...</div>;

  if (error) {
    const errorMessage = typeof error === 'string' ? error : error?.message || 'An unknown error occurred';
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <h1>Available Users</h1>
      <ul>
        {filteredUsers.length === 0 ? (
          <li>No users available at the moment.</li>
        ) : (
          filteredUsers.map((user) => {
            const friendshipStatus = user.friendshipStatus;

            return (
              <li key={user._id}>
                <p>
                  <strong>{user.username}</strong> ({user.email})
                </p>
                {friendshipStatus === "accepted" ? (
                  <button disabled>Already Friends</button>
                ) : friendshipStatus === "pending" ? (
                  <button disabled>Request Sent</button>
                ) : (
                  <button onClick={() => handleSendFriendRequest(user._id)}>
                    Send Friend Request
                  </button>
                )}
              </li>
            );
          })
        )}
      </ul>
      {hasMoreUsers && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default AvailableUsersPage;
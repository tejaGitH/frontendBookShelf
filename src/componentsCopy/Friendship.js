//displays users friends and pending requests 

// src/components/Friendship.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends, fetchPendingRequests, acceptFriendRequest, rejectFriendRequest } from '../actions/friendshipActions';

const Friendship = () => {
  const dispatch = useDispatch();
  const { friends, pendingRequests, loading, error } = useSelector(state => state.friendship);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchPendingRequests());
  }, [dispatch]);

  const handleAcceptRequest = (friendId) => {
    dispatch(acceptFriendRequest(friendId));
  };

  const handleRejectRequest = (friendId) => {
    dispatch(rejectFriendRequest(friendId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Friends</h2>
      <div>
        {friends.length > 0 ? (
          friends.map((friend) => <p key={friend._id}>{friend.name}</p>)
        ) : (
          <p>No friends yet.</p>
        )}
      </div>
      <h2>Pending Requests</h2>
      <div>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <div key={request._id}>
              <p>{request.name} sent a friend request.</p>
              <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
              <button onClick={() => handleRejectRequest(request._id)}>Reject</button>
            </div>
          ))
        ) : (
          <p>No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default Friendship;
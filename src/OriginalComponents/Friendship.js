import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendFriendRequest, getFriends, getPendingRequests, removeFriend } from '../actions/friendshipActions';

const Friendship = () => {
  const dispatch = useDispatch();
  const { friends, pendingRequests, loading, error } = useSelector(state => state.friendships);

  useEffect(() => {
    dispatch(getFriends());
    dispatch(getPendingRequests());
  }, [dispatch]);

  const handleSendRequest = (friendId) => {
    dispatch(sendFriendRequest(friendId));
  };

  const handleRemoveFriend = (friendshipId) => {
    dispatch(removeFriend(friendshipId));
  };

  return (
    <div>
      <h3>Friends List</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>
            {friend.user.username} <button onClick={() => handleRemoveFriend(friend._id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Pending Requests</h3>
      <ul>
        {pendingRequests.map(request => (
          <li key={request._id}>
            {request.user.username}
            <button onClick={() => dispatch(updateFriendshipStatus({ friendshipId: request._id, status: 'accepted' }))}>Accept</button>
            <button onClick={() => dispatch(updateFriendshipStatus({ friendshipId: request._id, status: 'declined' }))}>Decline</button>
          </li>
        ))}
      </ul>

      <h3>Send a Friend Request</h3>
      <button onClick={() => handleSendRequest('friendId')}>Send Friend Request</button>
    </div>
  );
};

export default Friendship;
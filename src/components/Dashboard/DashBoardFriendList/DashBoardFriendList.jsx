import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, removeFriend } from '../../../actions/friendshipActions';
import './DashBoardFriendList.css';

const DashboardFriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendships.friends);
  const error = useSelector((state) => state.friendships.error);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  const handleRemoveFriend = async (friendshipId) => {
    await dispatch(removeFriend(friendshipId));
    dispatch(getFriends()); // Fetch the updated friends list
  };

  return (
    <div className="friends-list-container">
      <h3>Friends List</h3>
      <div className="friends-list">
        {friends.map((friendship) => {
          const friend = friendship.friend || friendship.user;
          return (
            <div key={friendship._id} className="user-item">
              <img
                src="https://via.placeholder.com/50"
                alt={friend.username}
                className="profile-img"
              />
              <div className="user-info">
                <p>
                  <strong>{friend.username}</strong> ({friend.email})
                </p>
                <button onClick={() => handleRemoveFriend(friendship._id)}>
                  Remove Friend
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {friends.length === 0 && <p>No friends available.</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DashboardFriendsList;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, removeFriend } from '../../../actions/friendshipActions';
import './FriendsList.css';

const FriendsList = () => {
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friendships.friends);
    console.log("friends", friends);

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    const handleRemoveFriend = async (friendshipId) => {
        await dispatch(removeFriend(friendshipId));
        dispatch(getFriends()); // Fetch the updated friends list
    };

    return (
        <div className="friends-list">
            <h3>Friends List</h3>
            <ul>
                {friends.map((friendship) => {
                    const friend = friendship.friend || friendship.user;
                    return (
                        <li key={friendship._id} className="user-item">
                            <img src="https://via.placeholder.com/50" alt={friend.username} className="profile-img" />
                            <div className="user-info">
                                <p>
                                    <strong>{friend.username}</strong> ({friend.email})
                                </p>
                                <button onClick={() => handleRemoveFriend(friendship._id)}>Remove Friend</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {friends.length === 0 && <p>No friends available.</p>}
        </div>
    );
};

export default FriendsList;

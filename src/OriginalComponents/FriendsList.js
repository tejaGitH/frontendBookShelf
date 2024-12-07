import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, removeFriend } from '../actions/friendshipActions';

const FriendsList = () => {
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friendships.friends);

    const handleRemoveFriend = (friendshipId) => {
        dispatch(removeFriend(friendshipId))
            .then(() => {
                dispatch(getFriends()); // Refresh friends list after removal
            })
            .catch((error) => {
                console.error("Error removing friend:", error);
            });
    };

    if (!friends || friends.length === 0) {
        return <p>No friends found.</p>;
    }

    return (
        <div>
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend._id}>
                        {friend.user?.username || friend.user?.email || friend.friend?.username || friend.friend?.email || "Information not available"}
                        <button onClick={() => handleRemoveFriend(friend._id)}>
                            Remove Friend
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;

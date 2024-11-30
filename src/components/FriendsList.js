import React from 'react';

const FriendsList = ({ friends }) => {
    if (!friends || friends.length === 0) {
        return <p>No friends found.</p>;
    }

    return (
        <div>
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend._id}>
                        {friend.user ? (
                            <span>{friend.user.username} ({friend.user.email})</span>
                        ) : friend.friend && friend.friend.username ? (
                            <span>{friend.friend.username} ({friend.friend.email})</span>
                        ) : (
                            <span>Information not available</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;

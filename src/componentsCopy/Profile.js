import React from 'react';
import './Profile.css';

const Profile = ({ user }) => {
    return (
        <div className="profile">
            {/* Display user information */}
            <h1>{user.username}'s Profile</h1>

            {/* List of friends */}
            <h2>Friends</h2>
            {user.friends.map((friend) => (
                <p key={friend.id}>{friend.name}</p>
            ))}

            {/* List of pending requests */}
            <h2>Pending Requests</h2>
            {user.pendingRequests.map((request) => (
                <p key={request.id}>{request.name} sent a friend request.</p>
            ))}
        </div>
    );
};

export default Profile;
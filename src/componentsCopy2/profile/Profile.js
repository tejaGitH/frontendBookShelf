import React from 'react';
import './Profile.css';

const Profile = ({ user }) => {
    return (
        <div className="profile">
            <h1>{user.username}'s Profile</h1>

            {/* Display user information */}
            <p>Email: {user.email}</p>

            {/* List of friends */}
            <h2>Friends</h2>
            {user.friends.length > 0 ? (
                user.friends.map((friend) => (
                    <p key={friend.id}>{friend.name}</p>
                ))
            ) : (
                <p>No friends yet.</p>
            )}

            {/* List of pending requests */}
            <h2>Pending Requests</h2>
            {user.pendingRequests.length > 0 ? (
                user.pendingRequests.map((request) => (
                    <p key={request.id}>{request.name} sent a friend request.</p>
                ))
            ) : (
                <p>No pending requests.</p>
            )}
        </div>
    );
};

export default Profile;
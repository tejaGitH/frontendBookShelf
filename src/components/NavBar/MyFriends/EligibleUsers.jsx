import React from 'react';
import './EligibleUsers.css';

const EligibleUsers = ({
    availableUsers,
    handleSendFriendRequest,
    sendingRequest,
}) => {

    const onFriendRequestClick = (e, userId) => {
        e.preventDefault(); // Prevent default action
        handleSendFriendRequest(userId);
    };

    return (
        <div className="eligible-users-container">
            <div className="eligible-users">
                <h3>Our Community</h3>
                {console.log("availableUsers", availableUsers)}
                <ul>
                    {availableUsers.map((user) => (
                        <li key={user._id} className="user-item">
                            <img src="https://via.placeholder.com/50" alt={user.username} className="profile-img" />
                            <div className="user-info">
                                <p>
                                    <strong>{user.username}</strong> ({user.email})
                                </p>
                                <button
                                    onClick={(e) => onFriendRequestClick(e, user._id)}
                                    disabled={sendingRequest}
                                >
                                    {sendingRequest ? 'Sending Friend Request...' : 'Send Friend Request'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {availableUsers.length === 0 && <p>No available users to display.</p>}
            </div>
        </div>
    );
};

export default EligibleUsers;

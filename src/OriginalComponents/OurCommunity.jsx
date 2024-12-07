// OurCommunity.js
import React from 'react';

const OurCommunity = ({ availableUsers, handleSendFriendRequest, sendingRequest }) => {
  return (
    <div>
      <h2>Our Community</h2>
      <ul>
        {availableUsers.map((user) => (
          <li key={user._id}>
            <p>
              <strong>{user.username}</strong> ({user.email})
            </p>
            <button onClick={() => handleSendFriendRequest(user._id)} disabled={sendingRequest}>
              {sendingRequest ? "Sending Friend Request..." : "Send Friend Request"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OurCommunity;

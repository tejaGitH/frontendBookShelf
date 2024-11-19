import React from 'react';
import './FriendUpdates.css';

const FriendUpdates = ({ updates }) => {
    return (
        <div className="friend-updates">
            <h1>Friend Updates</h1>
            {updates.map((update) => (
                <div key={update.id} className="update-card">
                    <p>{update.friendName} reviewed "{update.bookTitle}"</p>
                    {/* Optionally add buttons for commenting or liking */}
                </div>
            ))}
        </div>
    );
};

export default FriendUpdates;
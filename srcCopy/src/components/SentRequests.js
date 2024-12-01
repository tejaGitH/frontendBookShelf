import React from 'react';

const SentRequests = ({ sentRequests, onCancelRequest }) => {
    if (!sentRequests || sentRequests.length === 0) {
        return <p>No sent friend requests.</p>;
    }

    return (
        <div>
            <h2>Sent Friend Requests</h2>
            <ul>
                {sentRequests.map((request) => (
                    <li key={request._id}>
                        {request.username} ({request.email})
                        <button onClick={() => onCancelRequest(request._id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SentRequests;

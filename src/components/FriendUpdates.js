import React from 'react';

const FriendUpdates = ({ friendUpdates }) => {
    if (!friendUpdates || friendUpdates.length === 0) {
        return <p>No friend updates found.</p>;
    }

    return (
        <div>
            <h2>Friend Updates</h2>
            <ul>
                {friendUpdates.map((update) => (
                    <li key={update._id}>
                        {update.username} ({update.email}) - {update.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendUpdates;

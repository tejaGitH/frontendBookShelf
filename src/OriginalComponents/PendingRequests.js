import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFriendshipStatus, getFriends, getPendingRequests } from '../actions/friendshipActions';

const PendingRequests = ({ pendingRequests }) => {
    const dispatch = useDispatch();
    const { pendingRequestsLoading } = useSelector((state) => state.friendships);

    if (!pendingRequests || pendingRequests.length === 0) {
        return <p>No pending friend requests.</p>;
    }

    const handleUpdateStatus = (friendshipId, status) => {
        dispatch(updateFriendshipStatus({ friendshipId, status }))
            .then(() => {
                dispatch(getFriends());
                dispatch(getPendingRequests());
            });
    };

    return (
        <div>
            <h2>Pending Friend Requests</h2>
            <ul>
                {pendingRequests.map((request) => (
                    <li key={request._id}>
                        {request.user && request.user.username ? (
                            <span>{request.user.username} ({request.user.email})</span>
                        ) : request.friend && request.friend.username ? (
                            <span>{request.friend.username} ({request.friend.email})</span>
                        ) : (
                            <span>Information not available</span>
                        )}
                        <button onClick={() => handleUpdateStatus(request._id, 'accepted')}>Accept</button>
                        <button onClick={() => handleUpdateStatus(request._id, 'declined')}>Decline</button>
                    </li>
                ))}
            </ul>
            {pendingRequestsLoading && <p>Updating...</p>}
        </div>
    );
};

export default PendingRequests;

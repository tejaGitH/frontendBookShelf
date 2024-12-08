import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingRequests, updateFriendshipStatus, getFriends } from '../../../actions/friendshipActions';
import './FriendRequests.css';

const FriendRequests = () => {
    const dispatch = useDispatch();
    const pendingRequests = useSelector((state) => state.friendships.pendingRequests);

    useEffect(() => {
        dispatch(getPendingRequests());
    }, [dispatch]);

    const handleAcceptRequest = (friendshipId) => {
        dispatch(updateFriendshipStatus({ friendshipId, status: 'accepted' })).then(() => {
            dispatch(getPendingRequests());
            dispatch(getFriends());
        });
    };

    const handleRejectRequest = (friendshipId) => {
        dispatch(updateFriendshipStatus({ friendshipId, status: 'rejected' })).then(() => {
            dispatch(getPendingRequests());
        });
    };

    return (
        <div className="friend-requests">
            <h3>Pending Friend Requests</h3>
            <ul>
                {pendingRequests.map((request) => (
                    <li key={request._id} className="user-item">
                        <img src="https://via.placeholder.com/50" alt={request.user?.username || 'Unknown User'} className="profile-img" />
                        <div className="user-info">
                            <p>
                                <strong>{request.user?.username || 'Unknown User'}</strong> ({request.user?.email || 'No Email Provided'})
                            </p>
                            <div className="action-buttons">
                                <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                                <button onClick={() => handleRejectRequest(request._id)} className="reject">Reject</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {pendingRequests.length === 0 && <p>No pending friend requests.</p>}
        </div>
    );
};

export default FriendRequests;

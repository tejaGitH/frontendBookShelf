import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, getPendingRequests } from '../actions/friendshipActions';
import FriendsList from './FriendsList';
import PendingRequests from './PendingRequests';

const FriendshipOverview = () => {
    const dispatch = useDispatch();
    const [view, setView] = useState('friends');

    const {
        friends = [],
        pendingRequests = [],
        friendsLoading,
        pendingRequestsLoading,
    } = useSelector((state) => state.friendships);

    useEffect(() => {
        if (view === 'friends' && !friendsLoading && friends.length === 0) {
            dispatch(getFriends());
        }
    }, [view, dispatch, friendsLoading, friends.length]);

    useEffect(() => {
        if (view === 'pendingRequests' && !pendingRequestsLoading && pendingRequests.length === 0) {
            dispatch(getPendingRequests());
        }
    }, [view, dispatch, pendingRequestsLoading, pendingRequests.length]);

    return (
        <div>
            <div className="buttons">
                <button onClick={() => setView('friends')} className={view === 'friends' ? 'active' : ''}>Friends</button>
                <button onClick={() => setView('pendingRequests')} className={view === 'pendingRequests' ? 'active' : ''}>Pending Requests</button>
            </div>

            {view === 'friends' && !friendsLoading && <FriendsList friends={friends} />}
            {view === 'pendingRequests' && !pendingRequestsLoading && <PendingRequests pendingRequests={pendingRequests} />}

            {(friendsLoading || pendingRequestsLoading) && <p>Loading...</p>}
        </div>
    );
};

export default FriendshipOverview;

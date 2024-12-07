import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, getPendingRequests } from '../../actions/friendshipActions';
import FriendsList from '../FriendsList';
import PendingRequests from '../PendingRequests';

const FriendshipOverview = ({ onRemoveFriend }) => {
    const dispatch = useDispatch();
    const [view, setView] = useState('friends');
    const [initialFetch, setInitialFetch] = useState(true);

    const {
        friends = [],
        pendingRequests = [],
        friendsLoading,
        pendingRequestsLoading
    } = useSelector((state) => state.friendships);

    useEffect(() => {
        if (view === 'friends' && initialFetch && friends.length === 0 && !friendsLoading) {
            dispatch(getFriends());
            setInitialFetch(false);
        }
    }, [view, initialFetch, dispatch, friendsLoading, friends.length]);

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

            {view === 'friends' && friendsLoading && <p>Loading friends...</p>}
            {view === 'friends' && !friendsLoading && friends.length === 0 && <p>No friends to display.</p>}
            {view === 'friends' && !friendsLoading && friends.length > 0 && <FriendsList friends={friends} onRemoveFriend={onRemoveFriend} />}

            {view === 'pendingRequests' && pendingRequestsLoading && <p>Loading pending requests...</p>}
            {view === 'pendingRequests' && !pendingRequestsLoading && pendingRequests.length === 0 && <p>No pending requests to display.</p>}
            {view === 'pendingRequests' && !pendingRequestsLoading && pendingRequests.length > 0 && <PendingRequests pendingRequests={pendingRequests} />}
        </div>
    );
};

export default FriendshipOverview;

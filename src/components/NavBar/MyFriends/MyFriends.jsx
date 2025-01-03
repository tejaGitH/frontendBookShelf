import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import { fetchEligibleUsers, sendFriendRequest } from '../../../actions/friendshipActions';
import EligibleUsers from './EligibleUsers';
import FriendRequests from './FriendRequests';
import FriendsList from './FriendsList';
import FriendUpdates from './FriendUpdates';
import FavoriteBooks from './FavoriteBooks';
import './MyFriends.css';

const MyFriends = () => {
    const dispatch = useDispatch();
    const { eligibleUsers, totalUsers, sendingRequest, friendUpdates, eligibleUsersLoading, eligibleUsersError, hasMoreUsers } = useSelector((state) => state.friendships);
    const{ userInfo} = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(0);
    const [localOffset, setLocalOffset] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const limit = 5;

    useEffect(() => {
        if (userInfo && initialLoad) {
            console.log("Fetching books and eligible users");
            dispatch(fetchEligibleUsers({ limit, offset: localOffset }));
            setInitialLoad(false);
        }
    }, [dispatch, userInfo, localOffset, limit, initialLoad]);

    const handlePageChange = ({ selected }) => {
        const newOffset = selected * limit;
        setLocalOffset(newOffset);
        setCurrentPage(selected);
        dispatch(fetchEligibleUsers({ limit, offset: newOffset }));
    };

    const handleSendFriendRequest = async (friendId) => {
        const userId = userInfo._id; // Use the current logged-in user's ID
        await dispatch(sendFriendRequest({ userId, friendId }));
        setSuccessMessage("Friend request sent successfully!");
        // Fetch new eligible users after sending friend request
        dispatch(fetchEligibleUsers({ limit, offset: currentPage * limit }));
    };

    const filteredEligibleUsers = eligibleUsers.filter(user => {
        const isPending = friendUpdates.some(update => update.friend?._id === user._id && update.status === 'pending');
        const isAccepted = friendUpdates.some(update => update.friend?._id === user._id && update.status === 'accepted');
        return !isPending && !isAccepted && user._id !== userInfo._id;
    });

    const pageCount = Math.ceil(totalUsers / limit);

    if (eligibleUsersLoading) {
        console.log("Loading state detected");
        return <div>Loading...</div>;
    }

    if (eligibleUsersError) {
        console.log("Error state detected", eligibleUsersError);
        return <div>Error: {eligibleUsersError?.message}</div>;
    }

    return (
        <div className="my-friends">
            <div className="content-container">
                <h2>My Friends</h2>
                <div className="first-row">
                    <div className="box large-column">
                        {filteredEligibleUsers.length === 0 ? (
                            <p>No available users to display.</p>
                        ) : (
                            <EligibleUsers
                                availableUsers={filteredEligibleUsers}
                                handleSendFriendRequest={handleSendFriendRequest}
                                sendingRequest={sendingRequest}
                            />
                        )}
                        {successMessage && <div className="alert-success">{successMessage}</div>}
                       
<div className="pagination-buttons">
    <a
        href="#"
        onClick={() => handlePageChange({ selected: currentPage - 1 })}
        className={currentPage === 0 ? 'disabled' : ''}
    >
        Previous
    </a>
    <a
        href="#"
        onClick={() => handlePageChange({ selected: currentPage + 1 })}
        className={!hasMoreUsers ? 'disabled' : 'styleNew'}
    >
        Next
    </a>
</div>
                        
                    </div>
                    <div className="box small-column">
                        <FavoriteBooks />
                    </div>
                </div>
                <div className="second-row">
                    <div className="box half-column">
                        <FriendRequests />
                    </div>
                    <div className="box half-column">
                        <FriendsList />
                    </div>
                </div>
            </div>
        
                <NavBar />
           
        </div>
    );
};

export default MyFriends;






import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendUpdates } from '../../../actions/friendshipActions';
import './FriendUpdates.css';

const FriendUpdates = () => {
    const dispatch = useDispatch();
    const friendUpdates = useSelector((state) => state.friendships.friendUpdates);

    useEffect(() => {
        dispatch(getFriendUpdates());
    }, [dispatch]);

    return (
        <div >
            <h3>space for development</h3>
           
           
        </div>
    );
};

export default FriendUpdates;

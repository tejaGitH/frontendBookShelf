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
        <div className="friend-updates">
            <h3>Friend Updates</h3>
            <ul>
                {friendUpdates.map((update) => (
                    <li key={update._id}>
                        <p>
                            <strong>{update.username}</strong>: {update.update}
                        </p>
                    </li>
                ))}
            </ul>
            {friendUpdates.length === 0 && <p>No updates from friends.</p>}
        </div>
    );
};

export default FriendUpdates;

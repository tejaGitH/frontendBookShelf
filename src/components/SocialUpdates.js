import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialUpdates } from '../actions/friendshipActions';

const SocialUpdates = () => {
    const dispatch = useDispatch();
    const hasFetchedUpdates = useRef(false); // Ref to track if updates have been fetched

    // Safely extract data from the Redux state
    const { updates = [], loading, error } = useSelector((state) => state.friendships || {});

    useEffect(() => {
        if (!loading && !hasFetchedUpdates.current && updates.length === 0) {
            hasFetchedUpdates.current = true;
            dispatch(fetchSocialUpdates());
        }
    }, [dispatch, loading, updates]);

    if (loading) {
        return <p>Loading social updates...</p>;
    }

    if (error) {
        return <p>Error: {error.message || error}</p>;
    }

    return (
        <div>
            <h2>Social Updates</h2>
            {updates.length > 0 ? (
                <ul>
                    {updates.map((update) => (
                        <li key={update._id} className="social-card">
                            {update.book ? (
                                <h3>{update.book.title}</h3>
                            ) : (
                                <p>Book information not available</p>
                            )}
                            {update.user ? (
                                <p>by {update.user.username}</p>
                            ) : (
                                <p>User information not available</p>
                            )}
                            <p>Rating: {update.rating}</p>
                            <p>Review: {update.review}</p>
                            <p>Date: {new Date(update.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No updates available.</p>
            )}
        </div>
    );
};

export default SocialUpdates;

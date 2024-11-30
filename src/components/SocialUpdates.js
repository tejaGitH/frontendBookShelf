import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialUpdates } from '../actions/friendshipActions';

const SocialUpdates = () => {
    const dispatch = useDispatch();

    const { updates = [], socialUpdatesLoading: loading, error } = useSelector((state) => state.friendships);

    useEffect(() => {
        if (!loading && (!updates || updates.length === 0)) {
            console.log("Dispatching fetchSocialUpdates...");
            dispatch(fetchSocialUpdates());
        }
    }, [dispatch]);

    console.log("SocialUpdates Component Rendered", { updates, loading, error });

    if (loading) {
        return <p>Loading social updates...</p>;
    }

    if (error) {
        return <p>Error: {error.message || error}</p>;
    }

    return (
        <div>
            <h2>Social Updates</h2>
            {updates && updates.length > 0 ? (
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

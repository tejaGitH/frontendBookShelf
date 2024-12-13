import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialUpdates } from '../../../actions/friendshipActions';
import './DashBoardSocialUpdates.css'; // Updated CSS filename

const DashboardSocialUpdates = () => {
    const dispatch = useDispatch();
    const socialUpdates = useSelector((state) => state.friendships.socialUpdates) || [];
    const socialUpdatesLoading = useSelector((state) => state.friendships.socialUpdatesLoading);
    const error = useSelector((state) => state.friendships.error);

    useEffect(() => {
        dispatch(fetchSocialUpdates());
    }, [dispatch]);

    return (
        <div className="social-updates">
            <h3>Social Updates</h3>
            <div className="updates-list">
                {socialUpdatesLoading ? (
                    <p>Loading updates...</p>
                ) : (
                    socialUpdates.length === 0 ? (
                        <p>No social updates available.</p>
                    ) : (
                        socialUpdates.map((update, index) => (
                            <div key={update._id || index} className="update-item">
                                <div className="update-header">
                                    <img src="https://via.placeholder.com/40" alt={update.user?.username || 'User'} className="profile-img-small" />
                                    <div className="user-info">
                                        <p className="username">{update.user?.username}</p>
                                        <p className="timestamp">{new Date(update.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="update-content">
                                    {update.book && (
                                        <img src="https://via.placeholder.com/100" alt={update.book.title} className="book-img-small" />
                                    )}
                                    <div className="review-content">
                                        <p>{update.review}</p>
                                        {update.book && (
                                            <p><strong>{update.book.title}</strong> by {update.book.author}</p>
                                        )}
                                        <div className="rating-stars">
                                            {'⭐'.repeat(update.rating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )).reverse() // Reverse the updates to show the newest on top
                    )
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default DashboardSocialUpdates;
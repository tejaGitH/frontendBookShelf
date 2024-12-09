import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialUpdates } from '../../../actions/friendshipActions';
import { likeReview, addComment } from '../../../actions/reviewActions';
import './SocialUpdates.css';

const SocialUpdates = () => {
    const dispatch = useDispatch();
    const socialUpdates = useSelector((state) => state.friendships.socialUpdates) || [];
    const socialUpdatesLoading = useSelector((state) => state.friendships.socialUpdatesLoading);
    const error = useSelector((state) => state.friendships.error);
    const [comments, setComments] = useState({});

    useEffect(() => {
        dispatch(fetchSocialUpdates());
    }, [dispatch]);

    const handleLike = (reviewId) => {
        dispatch(likeReview(reviewId));
    };

    const handleAddComment = (reviewId, comment) => {
        dispatch(addComment({ reviewId, comment })).then(() => {
            setComments(prevComments => ({
                ...prevComments,
                [reviewId]: [...(prevComments[reviewId] || []), { user: { username: 'You' }, comment }]
            }));
        });
    };

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
                        socialUpdates.map((update) => (
                            <div key={update._id} className="update-item">
                                <div className="update-header">
                                    <img src="https://via.placeholder.com/40" alt={update.user?.username || 'User'} className="profile-img-small" />
                                    <div className="user-info">
                                        <p className="username">{update.user?.username}</p>
                                        <p className="timestamp">Just now</p>
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
                                <div className="update-actions">
                                    <button className="like-button" onClick={() => handleLike(update._id)}>
                                        👍 {update.likes.length}
                                    </button>
                                    <div className="comment-box">
                                        <input 
                                            type="text" 
                                            placeholder="Add a comment..." 
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddComment(update._id, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                            style={{ flexGrow: 1 }}
                                        />
                                        <button onClick={(e) => handleAddComment(update._id, e.target.previousSibling.value)}>
                                            ➤
                                        </button>
                                    </div>
                                </div>
                                <div className="recent-comments">
                                    {update.comments.slice(0, 1).map((comment, index) => (
                                        <div key={index} className="comment">
                                            <strong>{comment.user?.username}:</strong> {comment.comment}
                                        </div>
                                    ))}
                                    {update.comments.length > 1 && (
                                        <button className="read-more-comments">Read more comments</button>
                                    )}
                                </div>
                            </div>
                        ))
                    )
                )}
                {error && <p className="error">{error.message}</p>} {/* Render error.message if error is an object */}
            </div>
        </div>
    );
};

export default SocialUpdates;

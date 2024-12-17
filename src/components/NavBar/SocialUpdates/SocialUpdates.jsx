import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialUpdates } from '../../../actions/friendshipActions';
import { likeReview, addComment } from '../../../actions/reviewActions';
import './SocialUpdates.css';
import defaultBookImage from '../../images/default-book-image.jpg';
import defaultUserImage from '../../images/default-user-image.jpg';

const SocialUpdates = () => {
    const dispatch = useDispatch();
    const socialUpdates = useSelector((state) => state.friendships.socialUpdates) || [];
    const socialUpdatesLoading = useSelector((state) => state.friendships.socialUpdatesLoading);
    const error = useSelector((state) => state.friendships.error);
    const userId = useSelector((state) => state.auth?.user?.id);

    const [comments, setComments] = useState({});
    const [expandedComments, setExpandedComments] = useState({}); // New state for expanded comments

    useEffect(() => {
        dispatch(fetchSocialUpdates());
    }, [dispatch]);

    const handleLike = (reviewId, action) => {
        dispatch(likeReview(reviewId, action)).then(() => {
            dispatch(fetchSocialUpdates());
        });
    };

    const handleAddComment = (reviewId, comment) => {
        dispatch(addComment({ reviewId, comment })).then(() => {
            setComments(prevComments => ({
                ...prevComments,
                [reviewId]: [...(prevComments[reviewId] || []), { user: { username: 'You' }, comment }]
            }));
        });
    };

    const toggleComments = (reviewId) => {
        setExpandedComments(prevState => ({
            ...prevState,
            [reviewId]: !prevState[reviewId] // Toggle expanded state
        }));
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
                        socialUpdates.map((update, index) => {
                            const hasLiked = update.likes.includes(userId);

                            return (
                                <div key={update._id || index} className="update-item">
                                    <div className="update-header">
                                        <img 
                                            src={defaultUserImage} 
                                            alt={update.user?.username || 'User'} 
                                            className="profile-img-small" 
                                        />
                                        <div className="user-info">
                                            <p className="username">{update.user?.username || 'Unknown User'}</p>
                                            <p className="timestamp">{new Date(update.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="update-content">
                                        {update.book && (
                                            <img 
                                                src={defaultBookImage} 
                                                alt={update.book.title} 
                                                className="book-img-small" 
                                            />
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
                                        <button 
                                            className="like-button" 
                                            onClick={() => handleLike(update._id, hasLiked ? 'dislike' : 'like')}
                                        >
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
                                        {expandedComments[update._id]
                                            ? update.comments.map((comment, i) => (
                                                <p key={i} className="comment">
                                                    <strong>{comment.user?.username}:</strong> {comment.comment}
                                                </p>
                                              ))
                                            : update.comments.slice(0, 1).map((comment, i) => (
                                                <p key={i} className="comment">
                                                    <strong>{comment.user?.username}:</strong> {comment.comment}
                                                </p>
                                              ))}
                                        {update.comments.length > 1 && (
                                            <button 
                                                className="read-more-comments" 
                                                onClick={() => toggleComments(update._id)}
                                            >
                                                {expandedComments[update._id] ? 'Show Less' : 'Read More Comments'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        }).reverse()
                    )
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default SocialUpdates;
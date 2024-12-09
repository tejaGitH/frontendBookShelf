import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../../actions/reviewActions';
import './BookCard.css';

const BookCard = ({ book, handleClose }) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviews);
    const hasReviewed = reviews.some(review => review.book === book._id);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value));
    };

    const handleSubmitReview = () => {
        const reviewData = { rating, review };
        dispatch(addReview({ bookId: book._id, reviewData })).then(() => {
            alert('Post added successfully.');
            handleClose();
        });
    };

    return (
        <div className="book-card">
            <button className="close-button" onClick={handleClose}>X</button>
            <img src="https://via.placeholder.com/200x250" alt={book.title} className="book-card-img" />
            <div className="book-card-info">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <div className="rating-stars">
                    {'⭐'.repeat(book.rating)}
                </div>
                {hasReviewed ? (
                    <p>You have already reviewed this book.</p>
                ) : (
                    <>
                        <textarea 
                            value={review} 
                            onChange={handleReviewChange} 
                            placeholder="Write your review or post here..."
                        />
                        <div className="rating-input">
                            <label>Rating: </label>
                            <input 
                                type="number" 
                                value={rating} 
                                onChange={handleRatingChange} 
                                max="5" 
                                min="1"
                            />
                        </div>
                        <button onClick={handleSubmitReview}>Add Post</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookCard;

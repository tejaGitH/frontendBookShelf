import React, { useState } from 'react';
import AddReview from './AddReview';

const BookCard = ({ book, onRatingChange, onReviewSubmit }) => {
    const [rating, setRating] = useState(book.rating || 0);
    const [about, setAbout] = useState(book.about || 'No description available');;

    const handleRatingChange = (e) => {
        const newRating = e.target.value;
        setRating(newRating);
        onRatingChange(book._id, newRating);
    };

    const handleReviewSubmit = () => {
        onReviewSubmit(book._id, about);
    };

    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    value={rating}
                    onChange={handleRatingChange}
                    max="5"
                    min="1"
                />
            </div>
            <div>
                <label>About:</label>
                <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Write about the book"
                />
            </div>
            <AddReview bookId={book._id} onReviewSubmit={handleReviewSubmit} />
        </div>
    );
};

export default BookCard;
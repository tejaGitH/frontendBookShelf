import React, { useState } from 'react';
import AddReview from './AddReview';

const BookCard = ({ book, onRatingChange, onReviewSubmit }) => {
    const [rating, setRating] = useState(book.rating || 0);
    const [review, setReview] = useState(book.review || '');

    const handleRatingChange = (e) => {
        const newRating = e.target.value;
        setRating(newRating);
        onRatingChange(book.id, newRating);
    };

    const handleReviewSubmit = () => {
        onReviewSubmit(book.id, review);
    };

    return (
        <div className="book-card">
            {/* <img src={book.thumbnail} alt={book.title} />
            <h3>{book.title}</h3>
            <p>by {book.author}</p> */}
            {/* <input type="number" value={rating} onChange={handleRatingChange} max="5" min="0" />
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Add a review" />
            <button onClick={handleReviewSubmit}>Submit Review</button> */}
              <BookCard
                    key={book.id} // Make sure this key is unique for each book
                    book={book}
                    onRatingChange={onRatingChange}
                    onReviewSubmit={onReviewSubmit}
                />
            <AddReview bookId={book.id}/>
        </div>
    );
};

export default BookCard;
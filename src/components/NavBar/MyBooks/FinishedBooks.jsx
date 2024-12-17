import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsForBook, addReview, deleteReview } from '../../../actions/reviewActions';
import { fetchFinishedBooks } from '../../../actions/bookActions';
import './FinishedBooks.css';


import defaultBookImage from '../../images/default-book-image.jpg'; // Adjust the path as needed

const FinishedBooks = () => {
    const dispatch = useDispatch();
    const finishedBooks = useSelector(state => state.books.finishedBooks);
    const reviews = useSelector(state => state.reviews.reviews); // Reviews array from state

    const [selectedBook, setSelectedBook] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    // Fetch finished books on mount
    useEffect(() => {
        dispatch(fetchFinishedBooks());
    }, [dispatch]);

    // Fetch reviews when a book is selected
    useEffect(() => {
        if (selectedBook) {
            dispatch(getReviewsForBook(selectedBook._id));
        }
    }, [selectedBook, dispatch]);

    // Add a review for the selected book
    const handleAddReview = () => {
        if (!review || rating === 0) {
            alert("Please enter a review and select a rating.");
            return;
        }

        const reviewData = { review, rating };
        dispatch(addReview({ bookId: selectedBook._id, reviewData }));
        closeBookCard(); // Close the book card after adding a review
    };

    // Delete a review for the selected book
    const handleDeleteReview = (id) => {
        dispatch(deleteReview(id));
        closeBookCard(); // Close the book card after deleting a review
    };

    // Close the selected book card
    const closeBookCard = () => {
        setSelectedBook(null);
        setReview(''); // Reset review text
        setRating(0);  // Reset rating
    };

    return (
        <div className="finished-books">
            <h3>Finished Books</h3>
            <div className="books-list">
                {finishedBooks.map((book) => (
                    <div
                        key={book._id}
                        className="book-card"
                        onClick={() => setSelectedBook(book)}
                    >
                        <img src={book.imageUrl || defaultBookImage} alt={book.title} />
                        <div className="book-info">
                            <p><strong>{book.title}</strong></p>
                            <p>{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Book Details */}
            {selectedBook && (
    <div className="selected-book">
        <button className="close-button" onClick={closeBookCard}>X</button>
        <h4>{selectedBook.title}</h4>
        <p><strong>Author:</strong> {selectedBook.author}</p>
        <p><strong>Rating:</strong> {selectedBook.rating}</p>

        {/* Reviews Section */}
        <div className="reviews-section">
            <h5>Reviews:</h5>
            {Array.isArray(reviews) && reviews.length > 0 && (
                reviews.map((review) => (
                    <div key={review._id} className="review-item">
                        <p>{review.review}</p>
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <button onClick={() => handleDeleteReview(review._id)}>Delete Review</button>
                    </div>
                ))
            )}
        </div>

        {/* Add Review Section */}
        {reviews.length === 0 && (
            <div className="add-review">
                <h5>Add a Review:</h5>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Enter your review here..."
                />
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value="0">Select a rating</option>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                <button onClick={handleAddReview}>Add Review</button>
            </div>
        )}
    </div>
)}
        </div>
    );
};

export default FinishedBooks;
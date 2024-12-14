import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks, markBookAsFinished } from '../../../actions/bookActions';
import { addReview } from "../../../actions/reviewActions";
import './CurrentBooks.css';

const CurrentBooks = ({ onSelectBook }) => {
    const dispatch = useDispatch();
    const { currentlyReading = [], loading, error, readingProgress = {} } = useSelector((state) => state.books);
    const [selectedBookForReview, setSelectedBookForReview] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    // Fetch current books when component loads
    useEffect(() => {
        dispatch(fetchCurrentBooks());
    }, [dispatch]);

    const handleMarkAsFinished = (book) => {
        setSelectedBookForReview(book); // Set the selected book for review modal
    };

    const handleAddReview = () => {
        if (review && rating > 0 && selectedBookForReview) {
            // Add review and mark book as finished
            dispatch(addReview({ bookId: selectedBookForReview._id, reviewData: { review, rating } }));
            dispatch(markBookAsFinished(selectedBookForReview._id)); // Mark as finished
            setSelectedBookForReview(null); // Close the review modal
            setReview('');
            setRating(0);
        } else {
            alert('Please provide both a review and a rating.');
        }
    };

    const handleBookClick = (book) => {
        onSelectBook(book); // Pass the selected book back to the parent component
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{`Error: ${error}`}</div>;

    return (
        <div className="current-books">
            <h3>Currently Reading</h3>
            <div className="books-list">
                {currentlyReading.length > 0 ? (
                    currentlyReading.map((book) => (
                        <div key={book._id} className="book-card" onClick={() => handleBookClick(book)}>
                            <img src={book.image || "https://via.placeholder.com/150"} alt={book.title} />
                            <div className="book-info">
                                <p><strong>{book.title}</strong></p>
                                <p>{book.author}</p>
                                {/* Handle reading progress with fallback */}
                                <p>Progress: {readingProgress[book._id]?.progress ?? "N/A"}%</p>

                                {/* Only show "Mark as Finished" if this book is the selected book for review */}
                                {selectedBookForReview && selectedBookForReview._id === book._id && (
                                    <button onClick={(e) => { e.stopPropagation(); handleMarkAsFinished(book); }}>
                                        Mark as Finished
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No books currently reading.</div>
                )}
            </div>

            {/* Review Modal */}
            {selectedBookForReview && (
                <div className="review-modal">
                    <h4>Add a Review for "{selectedBookForReview.title}"</h4>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review"
                    />
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        <option value={0}>Select a Rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <div className="modal-actions">
                        <button onClick={handleAddReview}>Submit Review</button>
                        <button onClick={() => setSelectedBookForReview(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentBooks;
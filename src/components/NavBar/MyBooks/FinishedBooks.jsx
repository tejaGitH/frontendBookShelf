import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFinishedBooks } from '../../../actions/bookActions';
import { updateReview } from '../../../actions/reviewActions';
import './FinishedBooks.css';

const FinishedBooks = ({ onSelectBook }) => {
    const dispatch = useDispatch();
    const { finishedBooks, loading, error } = useSelector((state) => state.books);
    const [selectedBook, setSelectedBook] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [editingReview, setEditingReview] = useState(false);

    useEffect(() => {
        dispatch(fetchFinishedBooks());
    }, [dispatch]);

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setReview(book.review || '');
        setRating(book.rating || 0);
    };

    const handleUpdateReview = () => {
        if (selectedBook && review && rating > 0) {
            dispatch(updateReview({ bookId: selectedBook._id, reviewData: { review, rating } }));
            setEditingReview(false);
        } else {
            alert('Please provide both a review and a valid rating.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{`Error: ${error}`}</div>;

    return (
        <div className="finished-books">
            <h3>Finished Books</h3>
            <div className="books-list">
                {finishedBooks.map((book) => (
                    <div key={book._id} className="book-card" onClick={() => handleBookClick(book)}>
                        <img src={book.image || "https://via.placeholder.com/150"} alt={book.title} />
                        <div className="book-info">
                            <p><strong>{book.title}</strong></p>
                            <p>{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedBook && (
                <div className="selected-book-container">
                    <h4>{selectedBook.title}</h4>
                    <div className="book-details">
                        <img src={selectedBook.image || "https://via.placeholder.com/150"} alt={selectedBook.title} />
                        <div className="book-info">
                            <p><strong>Author:</strong> {selectedBook.author}</p>
                            <p><strong>Rating:</strong> {selectedBook.rating || "N/A"}</p>
                            <p><strong>Review:</strong> {selectedBook.review || "No review added."}</p>
                        </div>
                    </div>

                    {!editingReview ? (
                        <button onClick={() => setEditingReview(true)}>Update Review & Rating</button>
                    ) : (
                        <div className="review-form">
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Update your review"
                            />
                            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                <option value={0}>Select a Rating</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <div className="review-actions">
                                <button onClick={handleUpdateReview}>Submit</button>
                                <button onClick={() => setEditingReview(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FinishedBooks;
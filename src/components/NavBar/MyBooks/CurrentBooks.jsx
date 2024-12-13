import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks, updateReadingProgress, markBookAsFinished } from '../../../actions/bookActions';
import { addReview } from '../../../actions/reviewActions';
import './CurrentBooks.css';

const CurrentBooks = ({ onSelectBook }) => {
    const dispatch = useDispatch();
    const currentlyReading = useSelector((state) => state.books.currentlyReading || []);
    const [selectedBook, setSelectedBook] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrentBooks());
    }, [dispatch]);

    const handleUpdateProgress = (book) => {
        const progress = prompt('Enter new progress:');
        dispatch(updateReadingProgress({ bookId: book._id, progress }));
    };

    const handleMarkAsFinished = (book) => {
        dispatch(markBookAsFinished(book._id));
    };

    const handleAddReview = (book) => {
        setSelectedBook(book);
        setShowReviewForm(true);
    };

    const handleSubmitReview = () => {
        dispatch(addReview({ bookId: selectedBook._id, reviewData: { review, rating } }));
        setShowReviewForm(false);
    };

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    return (
        <div className="current-books">
            <h3>Currently Reading Books</h3>
            <div className="books-list">
                {currentlyReading.map((book) => (
                    <div key={book._id} className="book-card" onClick={() => handleBookClick(book)}>
                        <img src={book.image} alt={book.title} />
                        <div className="book-info">
                            <p><strong>{book.title}</strong></p>
                            <p>{book.author}</p>
                            <p>Progress: {book.progress}%</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedBook && (
                <div className="book-card-container">
                    <div className="book-card">
                        <img src={selectedBook.image} alt={selectedBook.title} />
                        <div className="book-info">
                            <p><strong>{selectedBook.title}</strong></p>
                            <p>{selectedBook.author}</p>
                            <p>Rating: {selectedBook.rating}</p>
                            <p>Progress: {selectedBook.progress}%</p>
                            <div className="dropdown">
                                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Options
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button className="dropdown-item" onClick={() => handleUpdateProgress(selectedBook)}>Update Progress</button>
                                    <button className="dropdown-item" onClick={() => handleMarkAsFinished(selectedBook)}>Mark as Finished</button>
                                    <button className="dropdown-item" onClick={() => handleAddReview(selectedBook)}>Add Review</button>
                                </div>
                            </div>
                            {showReviewForm && (
                                <div className="review-form">
                                    <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review" />
                                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="0">Select a rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <button onClick={handleSubmitReview}>Submit Review</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentBooks;

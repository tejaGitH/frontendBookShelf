import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsForBook, updateReview, deleteReview } from '../../../actions/reviewActions';
import { fetchFinishedBooks } from '../../../actions/bookActions';
import './FinishedBooks.css';

const FinishedBooks = ({ onSelectBook, selectedBook }) => {
    const dispatch = useDispatch();
    const finishedBooks = useSelector(state => state.books.finishedBooks);
    const reviews = useSelector(state => state.reviews);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewId, setReviewId] = useState(null);
  
    useEffect(() => {
      if (selectedBook) {
        dispatch(getReviewsForBook(selectedBook._id));
      }
    }, [selectedBook, dispatch]);
    
    useEffect(() => {
      dispatch(fetchFinishedBooks());
    }, [dispatch]);
  
    const handleUpdateReview = () => {
      dispatch(updateReview({ reviewId, updatedData: { review, rating } }));
    };
  
    const handleDeleteReview = () => {
      dispatch(deleteReview(reviewId));
    };

  return (
    <div className="finished-books">
      <h3>Finished Books</h3>
      <div className="books-list">
        {finishedBooks.map((book) => (
          <div key={book._id} className="book-card" onClick={() => onSelectBook(book)}>
            <img src={book.imageUrl || "(link unavailable)"} alt={book.title} />
            <div className="book-info">
              <p><strong>{book.title}</strong></p>
              <p>{book.author}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <div className="selected-book">
          <h4>{selectedBook.title}</h4>
          <p><strong>Author:</strong> {selectedBook.author}</p>
          <p><strong>Rating:</strong> {selectedBook.rating}</p>
          {Array.isArray(reviews) && reviews.map((review) => (
            <div key={review._id}>
              <p>{review.review}</p>
              <button onClick={() => {
                setReviewId(review._id);
                setReview(review.review);
              }}>Update Review</button>
              <button onClick={() => handleDeleteReview(review._id)}>Delete Review</button>
            </div>
          ))}
          <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter review" />
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="0">Select a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={handleUpdateReview}>Update Review</button>
        </div>
      )}
    </div>
  );
};

export default FinishedBooks;

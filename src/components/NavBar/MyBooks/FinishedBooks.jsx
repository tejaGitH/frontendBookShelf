import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsForBook, updateReview, deleteReview } from '../../../actions/reviewActions';
import { fetchFinishedBooks } from '../../../actions/bookActions';
import './FinishedBooks.css';

import defaultBookImage from '../../images/default-book-image.jpg'; // Adjust the path as needed

const FinishedBooks = () => {
    const dispatch = useDispatch();
    const finishedBooks = useSelector(state => state.books.finishedBooks);
    const reviews = useSelector(state => state.reviews);
    
    const [selectedBook, setSelectedBook] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewId, setReviewId] = useState(null);

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

    const handleUpdateReview = () => {
        dispatch(updateReview({ reviewId, updatedData: { review, rating } }));
        setReview(''); // Clear review input after update
        setRating(0);  // Reset rating after update
        setReviewId(null); // Reset review ID
    };

    const handleDeleteReview = (id) => {
        dispatch(deleteReview(id));
        if (id === reviewId) {
            setReviewId(null); // Clear selected review ID if deleted
        }
    };

  return (
      <div className="finished-books">
          <h3>Finished Books</h3>
          <div className="books-list">
              {finishedBooks.map((book) => (
                  <div key={book._id} className="book-card" onClick={() => setSelectedBook(book)}>
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
                  <h4>{selectedBook.title}</h4>
                  <p><strong>Author:</strong> {selectedBook.author}</p>
                  <p><strong>Rating:</strong> {selectedBook.rating}</p>

                  {/* Reviews Section */}
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
                  
                  {/* Review Input */}
                  <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter review" />
                  <select value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value="0">Select a rating</option>
                      {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                      ))}
                  </select>
                  <button onClick={handleUpdateReview}>Update Review</button>
              </div>
          )}
      </div>
  );
};

export default FinishedBooks;

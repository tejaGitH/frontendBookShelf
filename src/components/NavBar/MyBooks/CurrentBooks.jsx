import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks, updateReadingProgress, markBookAsFinished, markBookAsCurrentlyReading, fetchReadingProgressForCurrentBooks } from '../../../actions/bookActions';
import { addReview } from '../../../actions/reviewActions';
import './CurrentBooks.css';
import defaultBookImage from '../../images/default-book-image.jpg';

const CurrentBooks = ({ onSelectBook, handleMarkAsFinished, handleUpdateProgressMyBooks, handleMarkAsCurrentlyReading, selectedBook }) => {
    const dispatch = useDispatch();
    const currentlyReading = useSelector(state => state.books.currentlyReading || []);
    const progress = useSelector(state => state.books.progress || {});
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [progressInput, setProgressInput] = useState('');
    const [message, setMessage] = useState('');
    const [progressUpdated, setProgressUpdated] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentBooks());
    //dispatch(fetchReadingProgressForCurrentBooks());
    console.log("selected ",selectedBook)
  }, [dispatch]);

  useEffect(() => {
    if (progressUpdated) {
        dispatch(fetchCurrentBooks());
        setProgressUpdated(false); // Reset flag after refetch
    }
}, [progressUpdated, dispatch]);


  const handleBookClick = (book) => {
    onSelectBook(book);
  };

  const handleSubmitReview = () => {
    dispatch(addReview({ bookId: selectedBook._id, reviewData: { review, rating } }));
    setShowReviewForm(false);
  };
  
  const handleUpdateProgress = (bookId) => {
    if (progressInput === '' || isNaN(progressInput) || parseInt(progressInput) < 0 || parseInt(progressInput) > 100) {
      setMessage('Please enter a valid progress percentage.');
      return;
    }
  
    // Dispatch the progress update action
    dispatch(updateReadingProgress({ bookId, progress: progressInput }));
    
    // Trigger a re-fetch of current books
    dispatch(fetchCurrentBooks());
    
    setMessage('Progress updated successfully!');
    setProgressInput('');
  };



  return (
    <div className="current-books">
      <h3>Currently Reading Books</h3>
      <div className="books-list">
        {currentlyReading.map((book) => {
          const bookProgress = book.progress || 0;
          return (
            <div key={book._id} className="book-card" onClick={() => handleBookClick(book)}>
              <img src={book.image || defaultBookImage} alt={book.title} />
              <div className="book-info">
                <p><strong>{book.title}</strong></p>
                <p>{book.author}</p>
                <p>Progress: {bookProgress}%</p>
              </div>
            </div>
          );
        })}
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
              <input type="number" value={progressInput} onChange={(e) => setProgressInput(e.target.value)} placeholder="Enter progress" />
              <div className="dropdown">
                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Options
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item" onClick={() => handleUpdateProgress(selectedBook._id)}>Update Progress</button>
                  <button className="dropdown-item" onClick={() => handleMarkAsFinished(selectedBook._id)}>Mark as Finished</button>
                  <button className="dropdown-item" onClick={() => handleMarkAsCurrentlyReading(selectedBook._id)}>Mark as Currently Reading</button>
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
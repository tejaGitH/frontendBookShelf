import React, { useState } from 'react';
import './SelectedBookCard.css';

const SelectedBookCard = ({ selectedBook, onClearSelection, onUpdateProgress, onMarkAsFinished, onMarkAsCurrentlyReading, onSubmitReview, reviews }) => {
  const [progressInput, setProgressInput] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  if (!selectedBook) return null;

  const handleUpdateProgress = () => {
    if (progressInput === '' || isNaN(progressInput) || progressInput < 0 || progressInput > 100) {
      alert('Please enter a valid progress percentage (0-100).');
      return;
    }
    onUpdateProgress(selectedBook._id, progressInput);
    setProgressInput('');
  };

  return (
    <div className="selected-book-card">
      <button className="close-button" onClick={onClearSelection}>X</button>
      <div className="book-details">
        <img src={selectedBook.imageUrl || "(link unavailable)"} alt={selectedBook.title} />
        <h4>{selectedBook.title}</h4>
        <p><strong>Author:</strong> {selectedBook.author}</p>

        {selectedBook.finished ? (
          <div>
            <p><strong>Rating:</strong> {selectedBook.rating}</p>
            <p><strong>Review:</strong> {reviews?.find(r => r.bookId === selectedBook._id)?.review || 'No review available'}</p>
          </div>
        ) : (
          <div>
            <input
              type="number"
              value={progressInput}
              onChange={(e) => setProgressInput(e.target.value)}
              placeholder="Enter progress"
            />
            <button onClick={handleUpdateProgress}>Update Progress</button>
            <button onClick={() => onMarkAsFinished(selectedBook._id)}>Mark as Finished</button>
          </div>
        )}

        <div>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write a review" />
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="0">Select rating</option>
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button onClick={() => onSubmitReview(selectedBook._id, review, rating)}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default SelectedBookCard;
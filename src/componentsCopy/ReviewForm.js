import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../actions/reviewActions';

const ReviewForm = ({ bookId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = { content };
    dispatch(addReview({ bookId, reviewData }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review here..."
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
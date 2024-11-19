// src/components/ReviewPage.js
//display and add reviews
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookById, getReviewsForBook } from '../actions/bookActions';
import { addReview } from '../actions/reviewActions';
import ReviewForm from './ReviewForm';

const ReviewPage = ({ match }) => {
  const dispatch = useDispatch();
  const { bookId } = match.params;
  const { selectedBook, reviews, loading, error } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(getBookById(bookId));
    dispatch(getReviewsForBook(bookId));
  }, [dispatch, bookId]);

  const handleAddReview = (reviewData) => {
    dispatch(addReview(bookId, reviewData));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{selectedBook.title}</h1>
      <p>{selectedBook.author}</p>
      <p>{selectedBook.description}</p>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => <p key={review.id}>{review.content}</p>)
      ) : (
        <p>No reviews yet.</p>
      )}
      <ReviewForm onSubmit={handleAddReview} />
    </div>
  );
};

export default ReviewPage;
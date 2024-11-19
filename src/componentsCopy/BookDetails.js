// src/components/BookDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../actions/bookActions';
import { getReviewsForBook } from '../actions/reviewActions';
import ReviewForm from "./ReviewForm";

const BookDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { bookId } = match.params;
  const { selectedBook, reviews, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookById(bookId));
    dispatch(getReviewsForBook(bookId));
  }, [dispatch, bookId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{selectedBook.title}</h1>
      <p>{selectedBook.author}</p>
      <p>Rating: {selectedBook.rating}</p>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.content}</p>
        </div>
      ))}
      <ReviewForm bookId={bookId} />
    </div>
  );
};

export default BookDetails;



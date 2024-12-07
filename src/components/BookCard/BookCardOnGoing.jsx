import React from 'react';
import { useDispatch } from 'react-redux';
import { markBookAsFinished } from '../../actions/bookActions';
import './BookCardOnGoing.css';

const BookCardOnGoing = ({ book }) => {
  const dispatch = useDispatch();

  const handleMarkAsFinished = () => {
    dispatch(markBookAsFinished(book._id));
  };

  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-details">
        <h3>{book.title}</h3>
        <p>by {book.author}</p>
        <button onClick={handleMarkAsFinished} className="mark-finished-button">
          Mark as Finished
        </button>
      </div>
    </div>
  );
};

export default BookCardOnGoing;
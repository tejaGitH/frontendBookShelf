import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks } from '../../../actions/bookActions';
import './DashBoardCurrentBooks.css';

const DashBoardCurrentBooks = ({ onSelect }) => {
  const dispatch = useDispatch();
  const currentBooks = useSelector((state) => state.books.currentlyReading);

  useEffect(() => {
    dispatch(fetchCurrentBooks());
  }, [dispatch]);

  return (
    <div className="current-books-section">
      <h3>Currently Reading</h3>
      <div className="current-books-list">
        {currentBooks?.map((book) => (
          <div key={book._id} className="current-book-card" onClick={() => onSelect(book)}>
            <img src="https://via.placeholder.com/50" alt={book.title} />
            <div className="current-book-info">
              <p><strong>{book.title}</strong></p>
              <p>By {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardCurrentBooks;
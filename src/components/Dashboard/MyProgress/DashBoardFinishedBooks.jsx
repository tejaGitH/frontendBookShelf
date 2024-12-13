import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFinishedBooks } from '../../../actions/bookActions';
import './DashBoardFinishedBooks.css';

const DashBoardFinishedBooks = () => {
  const dispatch = useDispatch();
  const finishedBooks = useSelector((state) => state.books.finishedBooks);

  useEffect(() => {
    dispatch(fetchFinishedBooks());
  }, [dispatch]);

  return (
    <div className="finished-books-section">
      <h3>Finished Books</h3>
      <div className="finished-books-list">
        {finishedBooks?.map((book) => (
          <div key={book._id} className="finished-book-card">
            <img src="https://via.placeholder.com/50" alt={book.title} />
            <div className="finished-book-info">
              <p><strong>{book.title}</strong></p>
              <p>By {book.author}</p>
            </div>
            <div className="rating-stars" >
                        {'⭐'.repeat(book.rating)}
               </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardFinishedBooks;
// src/components/BookList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../actions/bookActions';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {books && books.length > 0 ? (
        books.map((book) => (
          <div key={book.isbn}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>Rating: {book.rating}</p>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;
import React from 'react';
import BookItem from './BookItem';

const MyBooksList = ({ books, dispatch, deleteBook }) => {
  return (
    <div>
      {books && books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <BookItem key={book._id} book={book} dispatch={dispatch} deleteBook={deleteBook} />
          ))}
        </ul>
      ) : (
        <p>No books in your collection.</p>
      )}
    </div>
  );
};

export default MyBooksList;
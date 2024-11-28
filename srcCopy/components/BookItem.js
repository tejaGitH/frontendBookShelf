import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook } from "../actions/bookActions";

const BookItem = ({ book }) => {
  const dispatch = useDispatch(); // Using useDispatch hook

  const handleDelete = () => {
    dispatch(deleteBook(book._id)); // Dispatch the deleteBook action with the bookId
  };

  const handleEdit = () => {
    // Navigate to a book edit form or show an edit modal
    console.log('Edit book:', book);
  };

  return (
    <li>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default BookItem;
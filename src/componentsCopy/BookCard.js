import React from 'react';

const BookCard = ({ book, onDelete }) => {
  console.log("book object",book);
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>Rating: {book.rating}</p>

            {/* Add delete button */}
            <button onClick={() => onDelete(book._id)}>Delete</button>
        </div>
    );
};

export default BookCard;


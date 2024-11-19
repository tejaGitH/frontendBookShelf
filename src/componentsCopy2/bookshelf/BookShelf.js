import React from 'react';
import AddBook from './AddBook'; // Importing the AddBook component
import BookCard from './BookCard'; // Importing BookCard component
import './BookShelf.css';

const Bookshelf = ({ books, onDelete }) => {
    return (
        <div className="my-bookshelf">
            <h1>My Bookshelf</h1>
            <AddBook />
            <div className="book-list">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

export default Bookshelf;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook, searchUserBooks, markBookAsCurrentlyReading } from '../../../actions/bookActions';
import './UserBooks.css';
import { clearUserBooksSearchResults } from '../../../reducers/bookReducers';
import defaultBookImage from '../../images/default-book-image.jpg'; // Adjust the path as needed

const UserBooks = () => {
    const dispatch = useDispatch();

    // Redux State Selectors
    const userBooks = useSelector((state) => state.books.userBooks) || [];
    const userBooksSearchResults = useSelector((state) => state.books.userBooksSearchResults) || [];
    const currentlyReading = useSelector((state) => state.books.currentlyReading) || [];  // Add this line to get currentlyReading
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);

    // Component State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    // Fetch books on mount
    useEffect(() => {
        dispatch(fetchBooks());
        return () => dispatch(clearUserBooksSearchResults());
    }, [dispatch]);

    // Handle search input changes
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 2) {
            dispatch(searchUserBooks(query));
        } else if (query.length === 0) {
            dispatch(clearUserBooksSearchResults());
        }
    };

    // Handle removing a book
    const handleRemoveBook = (bookId) => {
        dispatch(deleteBook(bookId));
        setSelectedBook(null); // Close the book details after removing
    };

    const handleMarkAsCurrentlyReading = (book) => {
        // Check if the book is already in the currentlyReading list
        const bookExists = currentlyReading.find(b => b._id === book._id);
        if (bookExists) {
            console.log('Book is already marked as Currently Reading');
            return; // Don't proceed if the book is already in the list
        }
    
        // Proceed with marking the book as currently reading
        dispatch(markBookAsCurrentlyReading(book._id));
        setSelectedBook(null);
    };

    // Determine which list to render
    const booksToDisplay = searchQuery.length > 2 ? userBooksSearchResults : userBooks;

    return (
        <div className="user-books">
            <h3 className="header">Your Books</h3>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />

            {/* Loading and Error States */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {typeof error === "string" ? error : "An unexpected error occurred."}</p>}

            {/* Books List */}
            <div className="books-list">
                {booksToDisplay.length > 0 ? (
                    booksToDisplay.map((book) => (
                        <div key={book._id} className="book-card" onClick={() => setSelectedBook(book)}>
                            {/* Book Image */}
                            <img
                                src={book.image || defaultBookImage}
                                alt={book.title || 'Book cover'}
                                className="book-image"
                            />

                            {/* Book Info */}
                            <div className="book-info">
                                <span className="book-title">{book.title}</span>
                                <span className="book-author">by {book.author}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>

            {/* Detailed Book Card */}
            {selectedBook && (
                <div className="book-card-details">
                    <button className="close-button" onClick={() => setSelectedBook(null)}>X</button>
                    <img
                        src={selectedBook.image || defaultBookImage}
                        alt={selectedBook.title}
                        className="book-card-image"
                    />
                    <div className="book-card-info">
                        <h4>{selectedBook.title}</h4>
                        <p><strong>Author:</strong> {selectedBook.author}</p>
                        <p>{selectedBook.about || 'No description available.'}</p>
                        <button
                            className="mark-as-reading-button"
                            onClick={() => handleMarkAsCurrentlyReading(selectedBook)}
                        >
                            Mark as Currently Reading
                        </button>
                        <button
                            className="remove-book-button"
                            onClick={() => handleRemoveBook(selectedBook._id)}
                        >
                            Remove Book
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserBooks;
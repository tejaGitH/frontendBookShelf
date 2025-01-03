import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook, searchUserBooks, markBookAsCurrentlyReading, addBookToFavorites } from '../../../actions/bookActions';
import './UserBooks.css';
import { clearUserBooksSearchResults } from '../../../reducers/bookReducers';
import defaultBookImage from '../../images/default-book-image.jpg'; // Adjust the path as needed

const UserBooks = () => {
    const dispatch = useDispatch();

    // Redux State Selectors
    const userBooks = useSelector((state) => state.books.userBooks) || [];
    const userBooksSearchResults = useSelector((state) => state.books.userBooksSearchResults) || [];
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);

    // Component State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [showError, setShowError] = useState(false);  // State to control error visibility

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

    const handleRemoveBook = (bookId) => {
        dispatch(deleteBook(bookId)).then(() => {
            dispatch(fetchBooks()); // Re-fetch books after delete
            setSelectedBook(null); // Close the book details after removing
        });
    };

    const handleMarkAsCurrentlyReading = (bookId) => {
        dispatch(markBookAsCurrentlyReading(bookId)).then(() => {
            setSelectedBook((prev) => ({
                ...prev,
                currentlyReading: true,
            }));
            dispatch(fetchBooks());
        });
    };

    // Error Display - Show error for 2 seconds
    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 2000);  // Hide error after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [error]);

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

            {/* Loading State */}
            {/* {loading && <p>Loading...</p>} */}

            {/* Error Message Display */}
            {/* {showError && error && (
                <div className="error-message">
                    Error: {typeof error === "string" ? error : "fetching NYT api data"}
                </div>
            )} */}

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
                    <button
                        className="close-button"
                        onClick={() => setSelectedBook(null)}
                    >
                        X
                    </button>
                    <img
                        src={selectedBook.image || defaultBookImage}
                        alt={selectedBook.title}
                        className="book-card-image"
                    />
                    <div className="book-card-info">
                        <h4>{selectedBook.title}</h4>
                        <p>
                            <strong>Author:</strong> {selectedBook.author}
                        </p>
                        <p>
                            {selectedBook.about || 'No description available.'}
                        </p>
                        {selectedBook.currentlyReading ? (
                            <button className="currently-reading-button">
                                Book Marked as Currently Reading
                            </button>
                        ) : (
                            <button
                                className="mark-as-reading-button"
                                onClick={() => handleMarkAsCurrentlyReading(selectedBook._id)}
                            >
                                Mark as Currently Reading
                            </button>
                        )}
                        <button
                            className="remove-book-button"
                            onClick={() => handleRemoveBook(selectedBook._id)}
                        >
                            Remove Book
                        </button>
                        <button
    className={`add-to-favorites-button ${selectedBook.isFavorite ? 'favorite' : ''}`}
    onClick={() => {
        if (!selectedBook.isFavorite) {
            dispatch(addBookToFavorites(selectedBook._id)).then(() => {
                setSelectedBook((prev) => ({
                    ...prev,
                    isFavorite: true,
                }));
            });
        }
    }}
    disabled={selectedBook.isFavorite}
>
    {selectedBook.isFavorite ? 'Book Added to Favorites' : 'Add to Favorites'}
</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserBooks;
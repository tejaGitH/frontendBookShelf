import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, searchUserBooks, markBookAsCurrentlyReading } from '../../../actions/bookActions';
import './UserBooks.css';
import { clearUserBooksSearchResults } from '../../../reducers/bookReducers';

const UserBooks = () => {
    const dispatch = useDispatch();
    const userBooks = useSelector((state) => state.books.userBooks) || [];
    const userBooksSearchResults = useSelector((state) => state.books.userBooksSearchResults) || [];
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);
    const [searchQuery, setSearchQuery] = React.useState('');

    useEffect(() => {
        dispatch(fetchBooks());
        return () => dispatch(clearUserBooksSearchResults()); // Clear results on unmount
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 2) { // Trigger search after typing 3 characters
            dispatch(searchUserBooks(e.target.value));
        } else if (e.target.value.length === 0) {
            dispatch(clearUserBooksSearchResults()); // Clear results when input is empty
        }
    };

    const handleMarkAsCurrentlyReading = (bookId) => {
        dispatch(markBookAsCurrentlyReading(bookId))
            .then(() => dispatch(fetchBooks())) // Refresh the list of user books
            .catch(err => console.error('Mark as currently reading error:', err));
    };

    return (
        <div className="user-books">
            <h3 className="header">User Books</h3>
            <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            {loading && <p>Loading...</p>}
            {error && (
                <p>Error: {typeof error === "string" ? error : "An error occurred"}</p>
            )}
         <div className="books-list">
    {(searchQuery.length > 2 ? userBooksSearchResults : userBooks).map((book) => (
        <div key={book._id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-info">
                <div className="book-title-author">
                    <span className="book-title">{book.title}</span>
                    <span className="book-author">by {book.author}</span>
                </div>
            </div>
            <div className="book-rating">
                {book.rating > 0 && book.rating <= 5 && (
                    <div className="rating-stars">
                        {[...Array(Math.floor(book.rating))].map((star, index) => (
                            <span key={index} className="rating-star">&#9733;</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="book-about">
                <p>{book.about}</p>
                {!book.currentlyReading && (
                    <button
                        className="mark-as-reading-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsCurrentlyReading(book._id);
                        }}
                    >
                        &#128218;
                    </button>
                )}
            </div>
        </div>
    ))}
</div>

        </div>
    );
};

export default UserBooks;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsBooks } from '../../../actions/bookActions';
import BookCard from './BookCard';
import './Books.css';

const Books = ({ addSocialUpdate }) => {
    const dispatch = useDispatch();
    const { friendsBooks = [] } = useSelector((state) => state.books);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        dispatch(fetchFriendsBooks());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    const handleCloseBookCard = () => {
        setSelectedBook(null);
    };

    return (
        <div className="books">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search by author or book title" 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                />
            </div>
            <h3>Friends' Books</h3>
            <div className="books-list">
                {friendsBooks.length === 0 ? (
                    <p>No friends' books available.</p>
                ) : (
                    friendsBooks.filter(book => book.title.includes(searchQuery) || book.author.includes(searchQuery)).map((book) => (
                        <div key={book._id} className="book-item-container">
                            <div className="book-item" onClick={() => handleBookClick(book)}>
                                <img src="https://via.placeholder.com/100x140" alt={book.title} className="book-img" />
                                <div className="book-info">
                                    <p><strong>{book.title}</strong> by {book.author}</p>
                                    <p>Owned by: {book.userId.username}</p>
                                    <div className="rating-stars">
                                        {'⭐'.repeat(book.rating)}
                                    </div>
                                </div>
                            </div>
                            {selectedBook && selectedBook._id === book._id && (
                                <div className="book-card-wrapper">
                                    <BookCard book={book} handleClose={handleCloseBookCard} addSocialUpdate={addSocialUpdate} />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Books;

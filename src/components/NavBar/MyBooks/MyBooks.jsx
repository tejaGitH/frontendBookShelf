import React, { useState } from 'react';
import NavBar from '../NavBar';
import AddBook from './AddBook';
import BestSellers from './BestSellers';
import UserBooks from './UserBooks';
import CurrentBooks from './CurrentBooks';
import FinishedBooks from './FinishedBooks';
import './MyBooks.css';
import './BestSellers.css'; // Import BestSellers CSS separately

const MyBooks = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [showCurrentBooks, setShowCurrentBooks] = useState(true);
    const [showAddBook, setShowAddBook] = useState(false);

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleClearSelection = () => {
        setSelectedBook(null);
    };

    return (
        <div className="my-books">
            <div className="content-container">
                <h2>My Books</h2>
                <div className={`book-sections ${selectedBook ? 'blur-background' : ''}`}>
                    <div className="column best-sellers-column shadow-box">
                        <button className="custom-button" onClick={() => setShowAddBook(!showAddBook)}>
                            {showAddBook ? 'Hide Add Book' : 'Add Book'}
                        </button>
                        {showAddBook && <AddBook />}
                        <input type="text" className="search-bar" placeholder="Search Books..." />
                        <BestSellers onSelectBook={handleSelectBook} />
                    </div>
                    <div className="column">
                        <div className="large-column">
                            <UserBooks onSelectBook={handleSelectBook} />
                        </div>
                        <div className="large-column">
                            <div className="toggle-section">
                                <button onClick={() => setShowCurrentBooks(!showCurrentBooks)}>
                                    {showCurrentBooks ? 'Show Finished Books' : 'Show Currently Reading'}
                                </button>
                                <div className="book-section shadow-box">
                                    {showCurrentBooks ? <CurrentBooks /> : <FinishedBooks />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {selectedBook && (
                    <div className="selected-book">
                        <button className="close-button" onClick={handleClearSelection}>X</button>
                        <div className="selected-book-content">
                            <img src="https://via.placeholder.com/150" alt={selectedBook.title} />
                            <div className="book-details">
                                <h4>{selectedBook.title}</h4>
                                <p><strong>Author:</strong> {selectedBook.author}</p>
                                <p><strong>Rating:</strong> {selectedBook.rating}</p>
                                <p>{selectedBook.about}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="navbar-container">
                <NavBar />
            </div>
        </div>
    );
};

export default MyBooks;

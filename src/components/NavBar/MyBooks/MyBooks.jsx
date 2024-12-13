import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import NavBar from '../NavBar';
import AddBook from './AddBook';
import BestSellers from './BestSellers';
import UserBooks from './UserBooks';
import CurrentBooks from './CurrentBooks';
import FinishedBooks from './FinishedBooks';
import { markBookAsCurrentlyReading } from '../../../actions/bookActions';
import './MyBooks.css';
import './BestSellers.css'; // Import BestSellers CSS separately

const MyBooks = () => {
    const dispatch = useDispatch(); 
    const [selectedBook, setSelectedBook] = useState(null);
    const [showCurrentBooks, setShowCurrentBooks] = useState(true);
    const [showAddBook, setShowAddBook] = useState(false);

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleClearSelection = () => {
        setSelectedBook(null);
    };

    const handleMarkAsCurrentlyReading = (bookId) => {
        // Here you can dispatch the action to mark the book as "currently reading"
        dispatch(markBookAsCurrentlyReading(bookId));
        handleClearSelection();
    };

    return (
        <div className='navbar-component'>
            <div className="my-books">
            <div className="content-container">
                <h2>My Books</h2>
                <div className={`book-sections ${selectedBook ? 'blur-background' : ''}`}>
                    <div className="column best-sellers-column shadow-box">
                        <button className="custom-button" onClick={() => setShowAddBook(!showAddBook)}>
                            {showAddBook ? 'Hide Add Book' : 'Add Book'}
                        </button>
                        {showAddBook && <AddBook />}
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
                                {!selectedBook.currentlyReading && (
                                    <button
                                        className="mark-as-reading-button"
                                        onClick={() => handleMarkAsCurrentlyReading(selectedBook._id)}
                                    >
                                        Mark as Currently Reading
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="navbar-container">
                <NavBar />
            </div>
        </div>
        </div>
        
    );
};

export default MyBooks;
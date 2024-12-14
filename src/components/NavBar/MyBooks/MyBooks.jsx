import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import AddBook from './AddBook';
import BestSellers from './BestSellers';
import UserBooks from './UserBooks';
import CurrentBooks from './CurrentBooks';
import FinishedBooks from './FinishedBooks';
import { markBookAsCurrentlyReading, updateReadingProgress, markBookAsFinished } from '../../../actions/bookActions';
import { fetchBooks, fetchBestSellers } from '../../../actions/bookActions';
import './MyBooks.css';
import './BestSellers.css'; // Import BestSellers CSS separately

const MyBooks = () => {
    const dispatch = useDispatch(); 
    const [selectedBook, setSelectedBook] = useState(null);
    const [showCurrentBooks, setShowCurrentBooks] = useState(true);
    const [showAddBook, setShowAddBook] = useState(false);
    const [progress, setProgress] = useState('');
    const [comments, setComments] = useState('');

    // Select the books from the redux store
    const currentlyReading = useSelector(state => state.books.currentlyReading);
    const finishedBooks = useSelector(state => state.books.finishedBooks);
    const error = useSelector(state => state.books.error); // Error handling

    // Fetch books on initial load
    useEffect(() => {
        dispatch(fetchBooks()); // Fetch the user's books from the backend (both finished and currently reading)
        dispatch(fetchBestSellers()); // Fetch the best sellers
    }, [dispatch]);

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleClearSelection = () => {
        setSelectedBook(null);
        setProgress('');
        setComments('');
    };

    const handleMarkAsCurrentlyReading = (bookId) => {
        dispatch(markBookAsCurrentlyReading(bookId));
        handleClearSelection();
    };

    const handleUpdateProgress = (bookId) => {
        if (progress === '' || isNaN(progress) || parseInt(progress) < 0 || parseInt(progress) > 100) {
            alert("Please enter a valid progress percentage.");
            return;
        }
        dispatch(updateReadingProgress({ bookId, progress, comments }));
        handleClearSelection();
        alert("Progress updated successfully!"); // Feedback on success
    };

    const handleMarkAsFinished = (bookId) => {
        dispatch(markBookAsFinished(bookId));
        handleClearSelection();
    };

    return (
        <div className='navbar-component'>
            <div className="my-books">
                <div className="content-container">
                    <h2>My Books</h2>

                    {/* Error handling message */}
                    {error && <div className="error-message">Error: {error}</div>}

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
                                        {showCurrentBooks ? (
                                            <CurrentBooks onSelectBook={handleSelectBook} />
                                        ) : (
                                            <FinishedBooks onSelectBook={handleSelectBook} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedBook && (
                        <div className="selected-book">
                            <button className="close-button" onClick={handleClearSelection}>X</button>
                            <div className="selected-book-content">
                                <img src={selectedBook.image || "https://via.placeholder.com/150"} alt={selectedBook.title} />
                                <div className="book-details">
                                    <h4>{selectedBook.title}</h4>
                                    <p><strong>Author:</strong> {selectedBook.author}</p>
                                    <p><strong>Rating:</strong> {selectedBook.rating}</p>
                                    <p>{selectedBook.about}</p>

                                    {/* Progress section */}
                                    <div className="progress-section">
                                        <h5>Update Progress</h5>
                                        <textarea
                                            placeholder="Add comments..."
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        ></textarea>
                                        <input
                                            type="number"
                                            max="100"
                                            placeholder="Progress (%)"
                                            value={progress}
                                            onChange={(e) => setProgress(e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleUpdateProgress(selectedBook._id)}
                                        >
                                            Save Progress
                                        </button>
                                    </div>

                                    {/* Conditionally render "Mark as Finished" button */}
                                    {!selectedBook.finished && !currentlyReading.some(book => book._id === selectedBook._id) && (
                                        <button
                                            className="mark-as-finished-button"
                                            onClick={() => handleMarkAsFinished(selectedBook._id)}
                                        >
                                            Mark as Finished
                                        </button>
                                    )}

                                    {/* Conditionally render "Mark as Currently Reading" button */}
                                    {!selectedBook.currentlyReading && !currentlyReading.some(book => book._id === selectedBook._id) && !finishedBooks.some(book => book._id === selectedBook._id) && (
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
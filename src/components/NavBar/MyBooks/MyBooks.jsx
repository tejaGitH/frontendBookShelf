import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import AddBook from './AddBook';
import BestSellers from './BestSellers';
import UserBooks from './UserBooks';
import CurrentBooks from './CurrentBooks';
import FinishedBooks from './FinishedBooks';
import {
  markBookAsCurrentlyReading,
  updateReadingProgress,
  markBookAsFinished,
  fetchReadingProgressForCurrentBooks,
  fetchCurrentBooks,
  fetchBooks,
  fetchBestSellers,
  fetchFinishedBooks,
} from '../../../actions/bookActions';
import { getReviewsForBook } from '../../../actions/reviewActions';
import './MyBooks.css';
import './BestSellers.css';

const MyBooks = () => {
  const dispatch = useDispatch();

  const progress = useSelector((state) => state.books.progress);
  const currentlyReading = useSelector((state) => state.books.currentlyReading);
  const finishedBooks = useSelector((state) => state.books.finishedBooks);
  const error = useSelector((state) => state.books.error);

  const [selectedBook, setSelectedBook] = useState(null);
  const [showCurrentBooks, setShowCurrentBooks] = useState(true);
  const [showAddBook, setShowAddBook] = useState(false);
  const [progressInput, setProgressInput] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchBestSellers());
    dispatch(fetchReadingProgressForCurrentBooks());
    dispatch(fetchCurrentBooks());
    dispatch(fetchFinishedBooks());
  }, [dispatch]);

  // Store progress in localStorage
  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  // Retrieve progress from localStorage on initial render
  useEffect(() => {
    const storedProgress = localStorage.getItem('progress');
    if (storedProgress && storedProgress !== 'undefined') {
      dispatch(updateReadingProgress(JSON.parse(storedProgress)));
    }
  }, [dispatch]);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleClearSelection = () => {
    setSelectedBook(null);
    setProgressInput('');
    setComments('');
  };

  const handleMarkAsCurrentlyReading = (bookId) => {
    dispatch(markBookAsCurrentlyReading(bookId));
    handleClearSelection();
  };

  const handleUpdateProgress = (bookId, comments) => {
    if (
      progressInput === '' ||
      isNaN(progressInput) ||
      parseInt(progressInput) < 0 ||
      parseInt(progressInput) > 100
    ) {
      setMessage('Please enter a valid progress percentage.');
      return;
    }
    dispatch(updateReadingProgress({ bookId, progress: progressInput, comments }));
    setMessage('Progress updated successfully!');
    setProgressInput('');
    handleClearSelection();
  };

  const handleMarkAsFinished = (bookId) => {
    dispatch(markBookAsFinished(bookId));
    dispatch(fetchFinishedBooks());
    handleClearSelection();
  };

  return (
    <div className="navbar-component">
      <div className="my-books">
        <div className="content-container">
          <h2>My Books</h2>
          <div className={`book-sections ${selectedBook ? 'blur-background' : ''}`}>
            <div className="column best-sellers-column shadow-box">
              <button className="custom-button" onClick={() => setShowAddBook(!showAddBook)}>
                {showAddBook ? 'Hide Add Book' : 'Add Book'}
              </button>
              {showAddBook && <AddBook />}
              <BestSellers onSelectBook={(book) => handleSelectBook({ ...book, source: 'bestSellers' })} />
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
                      <CurrentBooks
                        onSelectBook={handleSelectBook}
                        handleMarkAsFinished={handleMarkAsFinished}
                        handleUpdateProgress={handleUpdateProgress}
                        handleMarkAsCurrentlyReading={handleMarkAsCurrentlyReading}
                      />
                    ) : (
                      <FinishedBooks
                        onSelectBook={(book) => {
                          handleSelectBook(book);
                          dispatch(fetchFinishedBooks());
                          dispatch(getReviewsForBook(book._id));
                        }}
                        selectedBook={selectedBook}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedBook && (
  <div className="selected-book">
    <button className="close-button" onClick={handleClearSelection}>
      X
    </button>
    <div className="selected-book-content">
      <img
        src={selectedBook.book_image || '/default-image.jpg'}
        alt={selectedBook.title}
      />
      <div className="book-details">
        <h4>{selectedBook.title}</h4>
        <p>
          <strong>Author:</strong> {selectedBook.author}
        </p>

        {/* Conditional rendering for Best Sellers */}
        {selectedBook.source === 'bestSellers' ? (
          <p>{selectedBook.description}</p>
        ) : (
          <>
            {selectedBook.finished ? (
              <div>
                <p>
                  <strong>Rating:</strong> {selectedBook.rating}
                </p>
                <p>
                  <strong>Review:</strong> {selectedBook.review}
                </p>
              </div>
            ) : (
              <div>
                <input
                  className="common"
                  type="number"
                  value={progressInput}
                  onChange={(e) => setProgressInput(e.target.value)}
                  placeholder="Enter progress"
                />
                <input
                  className="common"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter comments"
                />
                <button
                  className="common"
                  onClick={() => handleUpdateProgress(selectedBook._id, comments)}
                >
                  Update Progress
                </button>
                <button onClick={() => handleMarkAsFinished(selectedBook._id)}>
                  Mark as Finished
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
)}
      <div >
        <NavBar />
      </div>
    </div>
  );
};

export default MyBooks;
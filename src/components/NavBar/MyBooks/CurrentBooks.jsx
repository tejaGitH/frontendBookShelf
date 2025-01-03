// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentBooks, updateReadingProgress, markBookAsFinished } from '../../../actions/bookActions';
// import './CurrentBooks.css';
// import defaultBookImage from '../../images/default-book-image.jpg';

// const CurrentBooks = ({ onSelectBook, selectedBook }) => {
//   const dispatch = useDispatch();
//   const currentlyReading = useSelector(state => state.books.currentlyReading || []);
//   const [progressInput, setProgressInput] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     dispatch(fetchCurrentBooks());
//   }, [dispatch]);

//   const handleBookClick = (book) => {
//     onSelectBook(book);
//   };

//   const handleMarkAsFinished = (bookId) => {
//     dispatch(markBookAsFinished(bookId)).then(() => {
//       dispatch(fetchCurrentBooks());
//     });
//   };

//   const handleUpdateProgress = (bookId) => {
//     if (progressInput === '' || isNaN(progressInput) || parseInt(progressInput) < 0 || parseInt(progressInput) > 100) {
//       setMessage('Please enter a valid progress percentage.');
//       return;
//     }

//     dispatch(updateReadingProgress({ bookId, progress: parseInt(progressInput) }))
//       .then(() => {
//         setMessage('Progress updated successfully!');
//         setProgressInput('');
//       })
//       .catch(() => {
//         setMessage('Failed to update progress.');
//       });
//   };

//   return (
//     <div className="current-books">
//       <h3>Currently Reading Books</h3>
//       <div className="books-list">
//         {currentlyReading.map((book) => (
//           <div key={book._id} className="book-card" onClick={() => handleBookClick(book)}>
//             <img src={book.image || defaultBookImage} alt={book.title} />
//             <div className="book-info">
//               <p><strong>{book.title}</strong></p>
//               <p>{book.author}</p>
//               <p>Progress: {book.progress || 0}%</p>
//               <button onClick={() => handleMarkAsFinished(book._id)}>Mark as Finished</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {selectedBook && (
//         <div className="book-card-container">
//           <div className="book-card">
//             <img src={selectedBook.image} alt={selectedBook.title} />
//             <div className="book-info">
//               <p><strong>{selectedBook.title}</strong></p>
//               <p>{selectedBook.author}</p>
//               <p>Progress: {selectedBook.progress || 0}%</p>
//               <input
//                 type="number"
//                 value={progressInput}
//                 onChange={(e) => setProgressInput(e.target.value)}
//                 placeholder="Enter progress"
//               />
//               <button onClick={() => handleUpdateProgress(selectedBook._id)}>Update Progress</button>
//               {message && <p className="message">{message}</p>}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrentBooks;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks,fetchBooks, updateReadingProgress, markBookAsFinished } from '../../../actions/bookActions';
import './CurrentBooks.css';
import defaultBookImage from '../../images/default-book-image.jpg';

const CurrentBooks = ({ onSelectBook, selectedBook }) => {
    const dispatch = useDispatch();
    const currentlyReading = useSelector(state => state.books.currentlyReading || []);
    const [progressInput, setProgressInput] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(fetchCurrentBooks());
    }, [dispatch]);

    const handleBookClick = (book) => {
        onSelectBook(book);
    };

    const handleMarkAsFinished = (bookId) => {
        dispatch(markBookAsFinished(bookId)).then(() => {
            dispatch(fetchCurrentBooks());
            dispatch(fetchBooks()); // Refetch user books to ensure state consistency
        });
    };

    const handleUpdateProgress = (bookId) => {
        if (progressInput === '' || isNaN(progressInput) || parseInt(progressInput) < 0 || parseInt(progressInput) > 100) {
            setMessage('Please enter a valid progress percentage.');
            return;
        }

        dispatch(updateReadingProgress({ bookId, progress: parseInt(progressInput) }))
            .then(() => {
                setMessage('Progress updated successfully!');
                setProgressInput('');
            })
            .catch(() => {
                setMessage('Failed to update progress.');
            });
    };

    return (
        <div className="current-books">
            <h3>Currently Reading Books</h3>
            <div className="books-list">
                {currentlyReading.map((book) => (
                    <div key={book._id} className="book-card" onClick={() => handleBookClick(book)}>
                        <img src={book.image || defaultBookImage} alt={book.title} />
                        <div className="book-info">
                            <p><strong>{book.title}</strong></p>
                            <p>{book.author}</p>
                            <p>Progress: {book.progress || 0}%</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedBook && (
                <div className="book-card-container">
                    <div className="book-card">
                        <img src={selectedBook.image} alt={selectedBook.title} />
                        <div className="book-info">
                            <p><strong>{selectedBook.title}</strong></p>
                            <p>{selectedBook.author}</p>
                            <p>Progress: {selectedBook.progress || 0}%</p>
                            <input
                                type="number"
                                value={progressInput}
                                onChange={(e) => setProgressInput(e.target.value)}
                                placeholder="Enter progress"
                            />
                            <button onClick={() => handleUpdateProgress(selectedBook._id)}>Update Progress</button>
                            {message && <p className="message">{message}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentBooks;

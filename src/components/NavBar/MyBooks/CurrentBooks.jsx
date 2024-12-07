import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks } from '../../../actions/bookActions';
import './CurrentBooks.css';

const CurrentBooks = () => {
    const dispatch = useDispatch();
    const currentlyReading = useSelector((state) => state.books.currentlyReading || []); // Ensure state is not undefined

    useEffect(() => {
        dispatch(fetchCurrentBooks());
    }, [dispatch]);

    return (
        <div className="current-books">
            <h3>Currently Reading Books</h3>
            <div className="books-list">
                {currentlyReading.map((book) => (
                    <div key={book._id} className="book-card">
                        <img src="https://via.placeholder.com/50" alt={book.title} />
                        <div className="book-info">
                            <p><strong>{book.title}</strong></p>
                            <p>{book.author}</p>
                            <p>Rating: {book.rating}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrentBooks;

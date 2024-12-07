import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFinishedBooks } from '../../../actions/bookActions';
import './FinishedBooks.css';

const FinishedBooks = () => {
    const dispatch = useDispatch();
    const finishedBooks = useSelector((state) => state.books.finishedBooks);

    useEffect(() => {
        dispatch(fetchFinishedBooks());
    }, [dispatch]);

    return (
        <div className="finished-books">
            <h3>Finished Books</h3>
            <div className="books-list">
                {finishedBooks.map((book) => (
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

export default FinishedBooks;

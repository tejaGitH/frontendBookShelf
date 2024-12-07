import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../../actions/bookActions';
import './UserBooks.css';

const UserBooks = ({ onSelectBook }) => {
    const dispatch = useDispatch();
    const userBooks = useSelector((state) => state.books.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <div className="user-books">
            <h3>User Books</h3>
            <div className="books-list">
                {userBooks.map((book) => (
                    <div key={book._id} className="book-card" onClick={() => onSelectBook(book)}>
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

export default UserBooks;

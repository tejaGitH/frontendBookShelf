// MyProgress.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyProgress = ({ ongoingBooks, finishedBooks }) => {
    const navigate = useNavigate();

    return (
        <div className="my-progress">
            <h2>Ongoing Books</h2>
            <div className="book-list">
                {ongoingBooks.slice(0, 3).map(book => (
                    <div key={book._id} onClick={() => navigate(`/book/${book._id}`)}>
                        <h4>{book.title}</h4>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>
            <h2>Finished Books</h2>
            <div className="book-list">
                {finishedBooks.slice(0, 3).map(book => (
                    <div key={book._id} onClick={() => navigate(`/book/${book._id}`)}>
                        <h4>{book.title}</h4>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProgress;

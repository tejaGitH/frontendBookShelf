import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteBooks } from '../../../actions/bookActions';
import './FavoriteBooks.css'; // Use this updated CSS file

const FavoriteBooks = () => {
    const dispatch = useDispatch();

    // Select favorite books from Redux store
    const favoriteBooks = useSelector((state) => state.books.favoriteBooks || []);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);

    // Fetch favorite books on component mount
    useEffect(() => {
        dispatch(fetchFavoriteBooks());
    }, [dispatch]);

    if (loading) {
        return <div>Loading favorite books...</div>;
    }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div className="favorite-books">
            <h3>Favorite Books</h3>
            {favoriteBooks.length > 0 ? (
                <ul>
                    {favoriteBooks.map((book) => (
                        <li key={book._id} className="favorite-book-item">
                            <img
                                src={book.image || 'path/to/default-book-image.jpg'} // Replace with your default image path
                                alt={book.title}
                                className="book-image"
                            />
                            <div className="book-details">
                                <h4>{book.title}</h4>
                                <p>by {book.author}</p>
                                <p>{book.about}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorite books found.</p>
            )}
        </div>
    );
};

export default FavoriteBooks;
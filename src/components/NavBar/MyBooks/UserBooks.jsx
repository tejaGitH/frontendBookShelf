// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBooks } from '../../../actions/bookActions';
// import './UserBooks.css';

// const UserBooks = ({ onSelectBook }) => {
//     const dispatch = useDispatch();
//     const userBooks = useSelector((state) => state.books.userBooks);

//     useEffect(() => {
//         dispatch(fetchBooks());
//     }, [dispatch]);

//     return (
//         // <div className="user-books">
//         //     <h3>User Books</h3>
//         //     <div className="books-list">
//         //     {/* {userBooks.map((book) => ( */}
//         //         {userBooks.slice().reverse().map((book)=>(
//         //             <div key={book._id} className="book-card" onClick={() => onSelectBook(book)}>
//         //                 <img src="https://via.placeholder.com/50" alt={book.title} />
//         //                 <div className="book-info">
//         //                     <p><strong>{book.title}</strong></p>
//         //                     <p>{book.author}</p>
//         //                     <p>Rating: {book.rating}</p>
//         //                 </div>
//         //             </div>
//         //         ))}
//         //     </div>
//         // </div>
// <div className="user-books">
// <h3>User Books</h3>
// <div className="books-list">
// {userBooks.slice().reverse().map((book) => (
// <div key={book._id} className="book-card" onClick={() => onSelectBook(book)}>
// <img src={book.image} alt={book.title} className="book-image" />
// <div className="book-info">
// <div className="book-info-top">
// <div className="book-title-author">
// <span className="book-title">{book.title}</span>
// <span className="book-author">by {book.author}</span>
// </div>
// <div className="book-rating">
// {book.rating > 0 && book.rating <= 5 && (
// <div className="rating-stars">
// {[...Array(Math.floor(book.rating))].map((star, index) => (
// <span key={index} className="rating-star">&#9733;</span> 
// ))}
// </div>
// )}
// </div>
// </div>
// <p>{book.about}</p>
// </div>
// </div>
// ))}
// </div>
// </div>
//     );
// };

// export default UserBooks;


 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../../actions/bookActions';
import './UserBooks.css';

const UserBooks = ({ onSelectBook }) => {
    const dispatch = useDispatch();
    const userBooks = useSelector((state) => state.books.userBooks);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <div className="user-books">
            <h3 className="header">User Books</h3>
            <div className="books-list">
                {userBooks.slice().reverse().map((book) => (
                    <div
                        key={book._id}
                        className="book-card"
                        onClick={() => onSelectBook(book)}
                    >
                        <img src={book.image} alt={book.title} className="book-image" />
                        <div className="book-info">
                            <div className="book-info-top">
                                <div className="book-title-author">
                                    <span className="book-title">{book.title}</span>
                                    <span className="book-author">by {book.author}</span>
                                </div>
                                <div className="book-rating">
                                    {book.rating > 0 && book.rating <= 5 && (
                                        <div className="rating-stars">
                                            {[...Array(Math.floor(book.rating))].map((star, index) => (
                                                <span key={index} className="rating-star">
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="book-about">{book.about}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBooks;
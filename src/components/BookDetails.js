// src/components/BookDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetails } from '../actions/bookActions';

const BookDetails = ({ isbn }) => {
  const dispatch = useDispatch();
  const { currentBook, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBookDetails(isbn));
  }, [dispatch, isbn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {currentBook ? (
        <>
          <h3>{currentBook.title}</h3>
          <p>{currentBook.author}</p>
          <p>{currentBook.description}</p>
          <p>Rating: {currentBook.rating}</p>
        </>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default BookDetails;



// // src/components/BookDetails.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const BookDetails = () => {
//     const { isbn } = useParams();  // Extract ISBN from URL
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchBookDetails = async () => {
//             try {
//                 // Check if the ISBN exists in the URL and choose the appropriate one from the backend response
//                 const response = await axios.get(`http://localhost:3000/api/books/book-details/${isbn}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setBook(response.data); // Set the book data
//                 setLoading(false);
//             } catch (error) {
//                 setError("Failed to fetch book details");
//                 setLoading(false);
//             }
//         };

//         fetchBookDetails();
//     }, [isbn]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h2>{book.title}</h2>
//             <p>{book.author}</p>
//             <p>{book.description}</p>
//             <p>Publisher: {book.publisher}</p>
//             <p>Year: {book.year}</p>
//             {/* Add more details as needed */}
//             <div>
//                 <img src={book.book_image} alt={book.title} />
//             </div>
//             <div>
//                 <h3>Buy the Book:</h3>
//                 <ul>
//                     {book.buy_links.map((link) => (
//                         <li key={link.name}>
//                             <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default BookDetails;
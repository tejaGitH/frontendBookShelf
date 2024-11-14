// src/components/AddBook.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../actions/bookActions';

const AddBook = () => {
  const [bookData, setBookData] = useState({ title: '', author: '', rating: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(bookData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={bookData.rating}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addBook, getBooks } from "../actions/bookActions"; // Adjust the import path as necessary


// const AddBook = () => {
//     const dispatch = useDispatch();
//     const [title, setTitle] = useState("");
//     const [author, setAuthor] = useState("");
//     const [rating, setRating] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Dispatch the addBook action
//             const resultAction = await dispatch(addBook({ title, author, rating })).unwrap();
//             dispatch(getBooks());
//             console.log("Book added Successfully",resultAction);
//             setSuccessMessage("Book added successfully!");
//             setErrorMessage(""); // Clear any previous error messages
//             // Optionally reset form fields
//             setTitle("");
//             setAuthor("");
//             setRating("");
         
//         } catch (error) {
//             console.error("Failed to add book:", error);
//             setErrorMessage(error.response?.data?.message || "Failed to add book");
//             setSuccessMessage(""); // Clear any previous success messages
//         }
//     };

//     return (
//         <div>
//             <h2>Add a New Book</h2>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="text" 
//                     value={title} 
//                     onChange={(e) => setTitle(e.target.value)} 
//                     placeholder="Book Title" 
//                     required 
//                 />
//                 <input 
//                     type="text" 
//                     value={author} 
//                     onChange={(e) => setAuthor(e.target.value)} 
//                     placeholder="Author" 
//                     required 
//                 />
//                 <input 
//                     type="number" 
//                     value={rating} 
//                     onChange={(e) => setRating(e.target.value)} 
//                     placeholder="Rating (1-5)" 
//                     min="1" max="5" 
//                     required 
//                 />
                            
//                 <button type="submit">Add Book</button>
//             </form>
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//         </div>
//     );
// };

// export default AddBook;
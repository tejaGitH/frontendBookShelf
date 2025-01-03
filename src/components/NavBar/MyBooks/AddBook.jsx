import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, fetchBooks } from '../../../actions/bookActions';
import './AddBook.css';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [about, setAbout] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = { title, author, rating, about };
        dispatch(addBook(bookData))  // Dispatch to add the book
          .then(() => {
            // Optional: Fetch books again to re-sync with backend
            dispatch(fetchBooks());
          });
    
        // Reset form fields
        setTitle('');
        setAuthor('');
        setRating('');
        setAbout('');
    };

    return (
        <div className="add-book">
            <h3>Add a New Book</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Author" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Rating" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                />
                <textarea 
                    placeholder="About the Book" 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)} 
                />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;

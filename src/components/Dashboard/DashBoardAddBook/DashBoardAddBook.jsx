import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../../actions/bookActions';
import './DashBoardAddBook.css'; // Unique CSS for this component

const DashBoardAddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [about, setAbout] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = { title, author, rating, about };
        dispatch(addBook(bookData));
        setTitle('');
        setAuthor('');
        setRating('');
        setAbout('');
    };

    return (
        <div className="dashboard-add-book">
            <h3>Add a New Book</h3>
            <form onSubmit={handleSubmit} className="add-book-form">
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="input-field"
                />
                <input 
                    type="text" 
                    placeholder="Author" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    className="input-field"
                />
                <input 
                    type="number" 
                    placeholder="Rating" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    className="input-field"
                />
                <textarea 
                    placeholder="About the Book" 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)} 
                    className="textarea-field"
                />
                <button type="submit" className="submit-btn">Add Book</button>
            </form>
        </div>
    );
};

export default DashBoardAddBook;
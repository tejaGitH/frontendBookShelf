import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../actions/bookActions"; // Adjust the import path as necessary


const AddBook = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch the addBook action
            const resultAction = await dispatch(addBook({ title, author })).unwrap();
            console.log("Book added Successfully",resultAction);
            setSuccessMessage("Book added successfully!");
            setErrorMessage(""); // Clear any previous error messages
            // Optionally reset form fields
            setTitle("");
            setAuthor("");
        } catch (error) {
            console.error("Failed to add book:", error);
            setErrorMessage(error.response?.data?.message || "Failed to add book");
            setSuccessMessage(""); // Clear any previous success messages
        }
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Book Title" 
                    required 
                />
                <input 
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    placeholder="Author" 
                    required 
                />
                <button type="submit">Add Book</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default AddBook;
import React, { useState, useEffect } from "react";

const EditBookModal = ({ isVisible, onClose, bookId, bookData, onUpdate }) => {
    const [formData, setFormData] = useState(bookData || {});

    useEffect(() => {
        if (bookData) {
            setFormData(bookData);
        }
    }, [bookData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(bookId, formData);
    };

    if (!isVisible) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Book</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Author:
                        <input
                            type="text"
                            name="author"
                            value={formData.author || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Update Book</button>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;

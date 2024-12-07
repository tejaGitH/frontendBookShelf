import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook } from "../../actions/bookActions";
import { useNavigate } from "react-router-dom";

const AddBook = ({ bookToEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "", // Optional field
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If editing an existing book, populate form with its data
  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || "",
        author: bookToEdit.author || "",
        rating: bookToEdit.rating || "",
      });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookToEdit) {
      dispatch(updateBook({ bookId: bookToEdit._id, updatedData: formData }));
    } else {
      dispatch(addBook(formData));
    }
    setFormData({ title: "", author: "", rating: "" }); // Clear form after submission
    navigate("/dashboard"); // Redirect to dashboard after success
  };

  return (
    <div>
      <h2>{bookToEdit ? "Edit Book" : "Add a New Book"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>
        <button type="submit">{bookToEdit ? "Update Book" : "Add Book"}</button>
      </form>
    </div>
  );
};

export default AddBook;
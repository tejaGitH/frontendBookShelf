import React, { useState } from "react";
import ReviewModal from "./ReviewModal"; // Adjust the path

const BookTable = ({ books }) => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (bookId) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBookId(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenModal(book._id)}
                >
                  Add Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReviewModal
        show={isModalOpen}
        onClose={handleCloseModal}
        bookId={selectedBookId}
      />
    </div>
  );
};

export default BookTable;
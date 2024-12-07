import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookshelfTable from "./BookshelfTable";
import { fetchUserBooks, deleteBook, updateBook } from "../actions/bookActions";
import ReviewModal from "./ReviewModal";

const MyBookshelf = () => {
  const dispatch = useDispatch();

  // Get state from Redux
  const { books, loading, error } = useSelector((state) => state.books);

  // Modal state management
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    // Fetch user's books on component mount
    dispatch(fetchUserBooks());
  }, [dispatch]);

  // Handler for updating a book's rating or review
  const handleEdit = (bookId, updatedData) => {
    dispatch(updateBook({ bookId, updatedData }));
  };

  // Handler for deleting a book
  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  // Open review modal for the selected book
  const handleReview = (bookId) => {
    setSelectedBookId(bookId);
    setIsReviewModalOpen(true);
  };

  // Close review modal
  const closeModal = () => {
    setIsReviewModalOpen(false);
    setSelectedBookId(null);
  };

  return (
    <div className="my-bookshelf-container">
      <h1>My Bookshelf</h1>
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <BookshelfTable
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReview={handleReview}
      />
      
      {/* Review Modal */}
      <ReviewModal
        show={isReviewModalOpen}
        onClose={closeModal}
        bookId={selectedBookId}
      />
    </div>
  );
};

export default MyBookshelf;
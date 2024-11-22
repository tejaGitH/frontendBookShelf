import React from "react";

const BookshelfTable = ({ books, onEdit, onDelete, onReview }) => {
  return (
    <div className="bookshelf-table-container">
      {books.length === 0 ? (
        <p>No books in your bookshelf yet. Start adding some!</p>
      ) : (
        <table className="bookshelf-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Author</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <img
                    src={book.thumbnail || "placeholder.jpg"}
                    alt={book.title}
                    style={{ width: "50px", height: "75px" }}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <input
                    type="number"
                    value={book.rating || 0}
                    min={0}
                    max={5}
                    step={0.5}
                    onChange={(e) =>
                      onEdit(book._id, { rating: parseFloat(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <button onClick={() => onReview(book._id)}>Review</button>
                  <button onClick={() => onDelete(book._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookshelfTable;
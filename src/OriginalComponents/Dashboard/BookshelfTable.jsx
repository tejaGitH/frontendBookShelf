import React from "react";
import { useDispatch } from "react-redux";
import { markBookAsCurrentlyReading, fetchCurrentBooks } from "../../actions/bookActions";

const BookshelfTable = ({ books = [], onEdit, onDelete }) => {
    const dispatch = useDispatch();

    const handleMarkAsReading = (bookId) => {
        console.log(`handleMarkAsReading called with bookId: ${bookId}`);
        dispatch(markBookAsCurrentlyReading(bookId))
            .then(() => {
                console.log("Book marked as currently reading");
                dispatch(fetchCurrentBooks());
            })
            .catch((error) => {
                console.error("Error marking book as currently reading:", error);
            });
    };

    return (
        <div>
            {books.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>
                                    <img src={book.image || '/images/default-book-image.jpg'} alt={book.title} width="50" />
                                </td>
                                <td>
                                    <button onClick={() => onEdit(book._id, book)}>Edit</button>
                                    <button onClick={() => onDelete(book._id)}>Delete</button>
                                    {!book.currentlyReading && (
                                        <button onClick={() => handleMarkAsReading(book._id)}>
                                            Mark as Currently Reading
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No books available. Add some books to get started!</p>
            )}
        </div>
    );
};

export default BookshelfTable;

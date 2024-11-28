// import React from "react";
// import { useDispatch } from "react-redux";
// import { updateBook } from "../actions/bookActions";

// const BookshelfTable = ({ books = [], onEdit, onDelete }) => {
//     const dispatch = useDispatch();

//     const handleMarkAsReading = (bookId) => {
//         const book = books.find((b) => b._id === bookId);
//         if (!book?.currentlyReading) { // Dispatch only if the state actually needs updating
//             const updatedData = { currentlyReading: true };
//             dispatch(updateBook({ bookId, updatedData }));
//         }
//     };

//     return (
//         <div>
//             {books.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Author</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {books.map((book) => (
//                             <tr key={book._id}>
//                                 <td>{book.title}</td>
//                                 <td>{book.author}</td>
//                                 <td>
//                                     <button onClick={() => onEdit(book._id, book)}>Edit</button>
//                                     <button onClick={() => onDelete(book._id)}>Delete</button>
//                                     {!book.currentlyReading && (
//                                         <button onClick={() => handleMarkAsReading(book._id)}>
//                                             Mark as Currently Reading
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No books available. Add some books to get started!</p>
//             )}
//         </div>
//     );
// };

// export default BookshelfTable;

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from '../actions/bookActions';

const BookshelfTable = ({ books = [], onEdit, onDelete }) => {
    const dispatch = useDispatch();

    const handleMarkAsReading = (bookId) => {
        const updatedData = { currentlyReading: true };
        dispatch(updateBook({ bookId, updatedData }));
    };

    return (
        <div>
            {books.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>
                                    <button onClick={() => onEdit(book._id, book)}>Edit</button>
                                    <button onClick={() => onDelete(book._id)}>Delete</button>
                                    {!book.currentlyReading && (
                                        <button onClick={() => handleMarkAsReading(book._id)}>Mark as Currently Reading</button>
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

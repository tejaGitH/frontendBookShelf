
// import React, { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { getBooks } from "../actions/bookActions";
// import BookList from './BookList';
// import AddBook from "./AddBook";
// import BookDetails from './BookDetails';
// import SearchBooks from './SearchBooks';




// const BookShelf = ({ onRatingChange, onReviewSubmit}) => {
//     const dispatch = useDispatch();
//     const books = useSelector((state)=>state.books.books||[]);
//     const handleReviewSubmit =(reviewData)=>{
//         console.log("Review Submitted", reviewData);

//     }

//     useEffect(() => {
//         console.log("Current books in state:", books); // Log current books in state after any change
//     }, [books]);

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 dispatch(getBooks());
//              } catch (error) {
//                 console.error("Failed to fetch books:", error);
//             }
//         };
//         fetchBooks();
//     }, [dispatch]);

//     return (
//            <div className="bookShelf">
//                 <h1>BookShelf</h1>
//                 <SearchBooks />
//                 <AddBook />
//                 <BookList />        
//            </div>
//     );
// };

// export default BookShelf;

// src/components/Bookshelf.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks,deleteBook } from "../actions/bookActions";
import BookCard from "./BookCard";

const Bookshelf = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleDelete = (bookId)=>{
        if(bookId){
            console.log("book id to delete", bookId);
            dispatch(deleteBook(bookId));
        }else{
            console.error("book id is undefined");
        }
        
    }

    if(loading) return <div> Loading...</div>;
    if(error) return <div>{error}</div>;

    return (
        <div>
            <h1>My Bookshelf</h1>
            <div>
                {books.map((book) => (
                    <BookCard key={book._id} book={book} onDelete={handleDelete} />
                ))}
            </div>   
        </div>
    );
};

export default Bookshelf;
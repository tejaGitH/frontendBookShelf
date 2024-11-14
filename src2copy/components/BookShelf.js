// import React,{useEffect} from "react";
// import  {useSelector,useDispatch} from "react-redux";
// import { getBooks } from "../actions/bookActions";
// import AddBook from "./AddBook";

// const BookShelf = ()=>{
//     const {books, loading, error} = useSelector((state)=>({
//         books: state.books.books,
//         loading: state.books.loading,
//         error: state.books.error,
//     }));
//     const dispatch = useDispatch();

//     useEffect(()=>{
//         dispatch(getBooks('best-sellers'));
//     },[dispatch]);

//     return (
//         <div>
//             <h1>BooksShelf</h1>
//             {loading && <p>loading...</p>}
//             {error && <p>error:{error}</p>}
//             <ul>
//                 {Array.isArray(books) && books.length>0 ?(
//                      books.map((book)=>(
//                         <li key={book.id}>{book.title}</li>
//                     ))
//                 ):(<p>no books available</p>)}
               
//             </ul>
//             <AddBook />
//         </div>
//     )
// }
// export default BookShelf;


import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../actions/bookActions";
import BookCard from "./BookCard";
import AddBook from "./AddBook";
import AddReview from "./AddReview";
import api from "../utils/api";


const BookShelf = ({ onRatingChange, onReviewSubmit}) => {
    const dispatch = useDispatch();
    const books = useSelector((state)=>state.books.books||[]);
    const handleReviewSubmit =(reviewData)=>{
        console.log("Review Submitted", reviewData);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                dispatch(getBooks());
            //     const response = await api.get('/books/best-sellers');
            //        // {
            //         // headers: {
            //         //     Authorization: localStorage.getItem('token'), // Use the stored token here
            //         // },
            //     // });
            //     console.log(response.data);
            //     dispatch(getBooks(response.data.results.books)); // Dispatch action with fetched books
             } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };
    }, [dispatch]);

    return (
           <div className="bookShelf">
                <h2>My BookShelf</h2>
                <AddBook />
                <div>
                {books.map((book)=>( 
                     < BookCard key={book.id} book={book} onRatingChange={onRatingChange} onReviewSubmit={handleReviewSubmit} />  
                 ))}
                </div>
          
           
            
           </div>
    );
};

export default BookShelf;
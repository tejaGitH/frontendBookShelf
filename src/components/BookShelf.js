
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../actions/bookActions";
import BookList from './BookList';
import AddBook from "./AddBook";
import BookDetails from './BookDetails';
import SearchBooks from './SearchBooks';




const BookShelf = ({ onRatingChange, onReviewSubmit}) => {
    const dispatch = useDispatch();
    const books = useSelector((state)=>state.books.books||[]);
    const handleReviewSubmit =(reviewData)=>{
        console.log("Review Submitted", reviewData);

    }

    useEffect(() => {
        console.log("Current books in state:", books); // Log current books in state after any change
    }, [books]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                dispatch(getBooks());
             } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };
        fetchBooks();
    }, [dispatch]);

    return (
           <div className="bookShelf">
                <h1>BookShelf</h1>
                <SearchBooks />
                <AddBook />
                <BookList />        
           </div>
    );
};

export default BookShelf;
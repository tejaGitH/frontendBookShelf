// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getBooks = createAsyncThunk(
//     'books/getBooks',
//      async(list)=>{
//         const response = await axios.get(`http://localhost:3000/api/books/best-sellers/${list}`);//api endpoint
//         console.log(response.data);
//         return response.data.results.books;
//     }
// )

// export const addBook = createAsyncThunk(
//     'books/addBook',
//     async(book)=>{
//         const response = await axios.post('/api/books',book);
//         return response.data;
//     }
// )

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

// Set the base URL for the API
const API_URL = "http://localhost:3000/api/books";

export const getBooks = createAsyncThunk(
    'books/getBooks',
    async (list) => {
        try {
            const response = await axios.get(`${API_URL}/best-sellers/${list}`); // Ensure this endpoint is correct
            console.log(response.data);
            return response.data.results.books; // Return the list of books
        } catch (error) {
            // Handle errors appropriately
            return Promise.reject(error.response?.data || "Failed to fetch books");
        }
    }
);

export const addBook = createAsyncThunk(
    'books/addBook',
    async (bookData,{rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            console.log("token:",token)
            if(!token) throw new Error("No token found");
            const response = await axios.post(API_URL, bookData,{
                headers:{
                    Authoriztion: `Bearer ${token}`
                }
               } 
            ); // Ensure this endpoint is correct
            return response.data; // Return the added book data
        } catch (error) {
            // Handle errors appropriately
            // return Promise.reject(error.response?.data || "Failed to add book");
            return rejectWithValue(error.response?.data || {message: error.message});
        }
    }
);
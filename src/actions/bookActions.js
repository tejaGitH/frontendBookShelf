import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

// Set the base URL for the API
const API_URL = "http://localhost:3000/api/books";

export const getBooks = createAsyncThunk(
    'books/getBooks',
    async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) throw new Error("No token provided");
            const response = await axios.get(`${API_URL}/best-sellers`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
            return response.data.results.books; // Return the list of books
        } catch (error) {
            // Handle errors appropriately
            return Promise.reject(error.response?.data || "Failed to fetch books");
            //return rejectWithValue(error.response?.data || "Failed to fetch books");
        }
    }
);

export const addBook = createAsyncThunk(
    'books/addBook',
    async (bookData,{rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            console.log("bookData",bookData)
            // console.log("token:",token)
            if(!token) throw new Error("No token found");
            const response = await axios.post(`${API_URL}/add`, bookData,{
                headers:{
                    Authorization: `Bearer ${token}`
                },
               }); // Ensure this endpoint is correct
            console.log('response from addbook', response.data);
            return response.data; // Return the added book data
        } catch (error) {
            // Handle errors appropriately
            // return Promise.reject(error.response?.data || "Failed to add book");
            console.log(error)
            return rejectWithValue(error.response?.data || {message: error.message});
        }
    }
);

//create a new async thunk to fetch the details of the book
// src/actions/bookActions.js


// Create a new async thunk to fetch book details
export const getBookDetails = createAsyncThunk(
    'books/getBookDetails',
    async (isbn, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token provided');

            const response = await axios.get(`${API_URL}/book-details/${isbn}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data; // Return the book data
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch book details');
        }
    }
);

export const searchBooks = createAsyncThunk(
    'books/searchBooks',
    async (query, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token provided');

            const response = await axios.get(`${API_URL}/search/${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data; // Return search results
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to search books');
        }
    }
);

export const getUserBooks = createAsyncThunk(
    'books/getUserBooks',
    async(_,{rejectWithValue})=>{
        try{
            const token = localStorage.getItem('token');
            if(!token) throw new Error('No token provided');

            const response = await axios.get(`${API_URL}/user-books`, {
                headers: {
                    Authorization:  `Bearer ${token}`,
                }
            });
            return response.data;

        }catch(error){
            return rejectWithValue(error.response?.data || 'Failed to search books');
        }
    }
)


export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (bookId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token provided');

            const response = await axios.delete(`${API_URL}/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return bookId; // Return the ID of the deleted book
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete book');
        }
    }
);


export const updateBook = createAsyncThunk(
    'books/updateBook',
    async ({ bookId, updatedData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token provided');

            const response = await axios.put(`${API_URL}/${bookId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data; // Return the updated book
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update book');
        }
    }
);

import { createSlice } from "@reduxjs/toolkit";
import { getBooks,getBookDetails,addBook, getUserBooks, searchBooks, updateBook,deleteBook } from "../actions/bookActions";

const initialState = {
    books: [],
    currentBook: null,
    loading:false,
    error:null,
};

const bookSlice = createSlice({
    name:'books',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getBooks.pending,(state)=>{
            state.loading = true;
            state.error=null;
        })
        .addCase(getBooks.fulfilled,(state, action)=>{
            state.loading = false;
            state.books= action.payload;//payload is array of books
        })
        .addCase(getBooks.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getBookDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentBook = action.payload; // Store current book details
        })
        .addCase(getBookDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addBook.fulfilled, (state, action) => {
            state.books.push(action.payload);
            state.loading =false;
        }) 
        .addCase(addBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(searchBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.books = action.payload; // Update the books list with search results
        })
        .addCase(searchBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getUserBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.books = action.payload; // Set user-specific books
        })
        .addCase(getUserBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
            state.books = state.books.filter(book => book._id !== action.payload); // Remove the deleted book
            state.loading = false;
        })
        .addCase(deleteBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateBook.fulfilled, (state, action) => {
            const index = state.books.findIndex(book => book._id === action.payload._id);
            if (index !== -1) {
                state.books[index] = action.payload; // Update the book details
            }
            state.loading = false;
        })
        .addCase(updateBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
    },
})

export const {actions}= bookSlice;
export default bookSlice.reducer;







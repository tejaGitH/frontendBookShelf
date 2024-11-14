import { createSlice } from "@reduxjs/toolkit";
import { getBooks,addBook } from "../actions/bookActions";

const initialState = {
    books: [],
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
        .addCase(addBook.fulfilled,(state,action)=>{
            state.books.push(action.payload);//payload is new book
        })
    },
})

export const {actions}= bookSlice;
export default bookSlice.reducer;







//import {createReducer, createAction} from '@redux/toolkit'
// import axios from 'axios'

// export const getBooks = createAction('GET_BOOKS');
// export const addBook = createAction('ADD_BOOK');

// const initialState = [];

// const bookReducer = createReducer(initialState,{
//     [getBooks.fulfilled]: (state, action)=>action.payload,
//     [addBook.fulfilled]: (state, action)=>[...state,action.payload],
// });

// export default bookReducer;
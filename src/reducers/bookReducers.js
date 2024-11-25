import { createSlice, current } from "@reduxjs/toolkit";
import {
  fetchBooks,
  fetchBookById,
  addBook,
  updateBook,
  deleteBook,
  fetchBestSellers,fetchBookDetails,searchBooks,
  fetchCurrentBooks,fetchReadingProgress,updateReadingProgress,
} from "../actions/bookActions";

const initialState = {
  books: [],
  bestSellers: [],
  searchResults: [],
  currentlyReading:[],
  selectedBook: null,
  readingProgress:{},
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    removeBookFromState: (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        console.log('Books loaded into state:', action.payload); 
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Error loading books:', action.payload); 
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        console.log('Add Book Fulfilled Payload:', action.payload);
        if (action.payload) {
          state.books.push(action.payload);
          // state.books.push({
          //   _id: action.payload.bookId,
          //   ...action.meta.arg //use input data from the actions mets
          // });
        }
      })
      .addCase(addBook.rejected,(state, action)=>{
        state.error = action.error.message || "Failed to add book";
        console.error('Error adding book', action.error);
        console.log('Action payload:', action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      // .addCase(deleteBook.fulfilled, (state, action) => {
      //   state.books = state.books.filter((book) => book._id !== action.payload);
      // });
       // Delete Book
       .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      })

      // Fetch Best Sellers
      .addCase(fetchBestSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        console.log('BestSellers:', action.payload);
        state.loading = false;
        state.bestSellers = action.payload?.results?.books || [];
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload||"error fetching best sellers";
      })

      // Fetch Book Details
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search Books
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentBooks.fulfilled, (state, action) => {
        state.loading = false;
        // Only update state if the data has changed
        // if (JSON.stringify(state.currentlyReading) !== JSON.stringify(action.payload)) {
        state.currentlyReading = action.payload || {};
      })
      .addCase(fetchCurrentBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch currently reading books';
      })
      .addCase(fetchReadingProgress.pending, (state) => {
         state.loading = true;
      }) 
      .addCase(fetchReadingProgress.fulfilled, (state, action) => {
         state.loading = false;
         state.readingProgress[action.payload.book._id] = action.payload; 
      }) 
      .addCase(fetchReadingProgress.rejected, (state, action) => {
         state.loading = false; state.error = action.payload; 
      })
      .addCase(updateReadingProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReadingProgress.fulfilled, (state, action) => {
        state.loading = false;
        const { bookId, progress, comments } = action.payload;
        const book = state.currentlyReading.find((book) => book._id === bookId);
        if (book) {
          book.progress = progress;
          book.comments = comments;
        }
      })
      .addCase(updateReadingProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update reading progress';
      });
  },
});

export default bookSlice.reducer;
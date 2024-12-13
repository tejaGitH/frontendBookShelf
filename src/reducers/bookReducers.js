import { createSlice, current } from "@reduxjs/toolkit";
import {
  fetchBooks,
  fetchBookById,
  addBook,
  updateBook,
  deleteBook,
  fetchBestSellers,fetchBookDetails,searchBooks,searchUserBooks,
  fetchCurrentBooks,fetchReadingProgress,updateReadingProgress,
  markBookAsFinished,
  markBookAsCurrentlyReading,
  fetchFinishedBooks,
  fetchFriendsBooks,
  addFriendBookToUser,
} from "../actions/bookActions";
import { act } from "react";

const initialState = {
  books: [],
  bestSellers: [],
  //searchResults: [],
  bestSellersSearchResults: [],
  userBooksSearchResults: [],
  friendsBooks: [],
  currentlyReading:[],
  finishedBooks: [],
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
    }, clearBestSellersSearchResults: (state) => {
            state.bestSellersSearchResults = [];
        },
        clearUserBooksSearchResults: (state) => {
            state.userBooksSearchResults = [];
        },
    
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchBooks.pending, (state) => {
      //   state.loading = true;
      // })
      // // .addCase(fetchBooks.fulfilled, (state, action) => {
      // //   state.loading = false;
      // //   state.books = action.payload;
      // //   console.log('Books loaded into state:', action.payload); 
      // // })
      
      // .addCase(fetchBooks.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      //   console.error('Error loading books:', action.error.message);
      // })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        console.log('Add Book Fulfilled Payload:', action.payload);
        if (action.payload) {
          state.books.push(action.payload);
          state.userBooks = [action.payload, ...state.userBooks]; // Add new book to the top
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

     
      .addCase(fetchCurrentBooks.pending, (state) => {
        state.loading = true;
        console.log("current Pending");
      })
      .addCase(fetchCurrentBooks.fulfilled, (state, action) => {
        state.loading = false;
        // Only update state if the data has changed
        //  if (JSON.stringify(state.currentlyReading) !== JSON.stringify(action.payload)) {
      // state.currentlyReading = action.payload || [];
        //state.books= action.payload;
       state.currentlyReading = action.payload.filter((book)=> book.currentlyReading)
      // state.currentlyReading = action.payload.filter(book=> book.status === 'currentlyReading')
       console.log('Currently Reading Books loaded into state:', state.currentlyReading)
     // }
      })
      .addCase(fetchCurrentBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch currently reading books';
        console.log("current rejected", state.error);
      })
      .addCase(fetchReadingProgress.pending, (state) => {
         state.loading = true;
         
      }) 
      .addCase(fetchReadingProgress.fulfilled, (state, action) => {
         state.loading = false;
         state.readingProgress[action.payload.book._id] = action.payload; 
         console.log("fetchCureentReducere",action.payload);
      }) 
      .addCase(fetchReadingProgress.rejected, (state, action) => {
         state.loading = false; 
         state.error = action.payload; 
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
      })
      .addCase(markBookAsFinished.pending,(state)=>{
        state.loading= true;
      })
      .addCase(markBookAsFinished.fulfilled,(state,action)=>{
        state.loading=false;
        const {_id: bookId} = action.payload;
        const bookIndex = state.currentlyReading.findIndex((book)=>book._id ===bookId);
        if(bookIndex !== -1){
          state.currentlyReading.splice(bookIndex, 1);
        } 
      })
      .addCase(markBookAsFinished.rejected,(state,action)=>{
        state.loading=false;
        state.error = action.payload || 'failed to mark book as finished'
      })
      .addCase(markBookAsCurrentlyReading.pending,(state)=>{
        state.loading= true;
      })
      .addCase(markBookAsCurrentlyReading.fulfilled,(state,action)=>{
        state.loading=false;
        const updatedBook = action.payload;
        const existingBook = state.currentlyReading.find((book)=>book._id ===updatedBook._id);
        if(!existingBook){
          state.currentlyReading.push(updatedBook);
        } 
      })
      .addCase(markBookAsCurrentlyReading.rejected,(state,action)=>{
        state.loading=false;
        state.error = action.payload || 'failed to mark book as currently reading'
      })
      .addCase(fetchFinishedBooks.pending,(state)=>{
        state.loading = true;
        state.error= null;
      })
      .addCase(fetchFinishedBooks.fulfilled,(state,action)=>{
        state.loading = false;
        state.finishedBooks = action.payload;
      })
      .addCase(fetchFinishedBooks.rejected,(state,action)=>{
        state.loading= false;
        state.error=action.payload;
      })
      .addCase(fetchFriendsBooks.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchFriendsBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.friendsBooks = action.payload;
        console.log("friendsBooks",action.payload);
    })
    .addCase(fetchFriendsBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(addFriendBookToUser.fulfilled, (state, action) => {
      console.log("addfriendsBooks",action.payload);
       if (action.payload) { 
        state.userBooks.push({...action.payload, isFriendBook: true}); 
      } 
    })
   
    .addCase(fetchBooks.pending, (state) => {
      state.loading = true;
  })
  .addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.userBooks = action.payload.userBooks || [];
      state.friendsBooks = action.payload.friendsBooks || [];
  })
  .addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
  })
  .addCase(searchUserBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
  })
  .addCase(searchUserBooks.fulfilled, (state, action) => {
      state.loading = false;
      // Ensure both userBooks and friendsBooks are arrays before combining
      state.userBooksSearchResults = [
          ...Array.isArray(action.payload.userBooks) ? action.payload.userBooks : [],
          ...Array.isArray(action.payload.friendsBooks) ? action.payload.friendsBooks : []
      ];
  })
  .addCase(searchUserBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
  })
  .addCase(searchBooks.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(searchBooks.fulfilled, (state, action) => {
    state.loading = false;
    state.bestSellersSearchResults = action.payload;
  })
  .addCase(searchBooks.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  },
});


export const { clearBestSellersSearchResults, clearUserBooksSearchResults } = bookSlice.actions;

export default bookSlice.reducer;








// //export const searchUserBooks = createAsyncThunk(
//   "books/searchUserBooks",
//   async (query) => {
//       const response = await axiosInstance.get(`/books/search/books/${query}`);
//       // Ensure that response.data contains userBooks and friendsBooks
//       return {
//           userBooks: Array.isArray(response.data.userBooks) ? response.data.userBooks : [],
//           friendsBooks: Array.isArray(response.data.friendsBooks) ? response.data.friendsBooks : []
//       };
//   }
// );


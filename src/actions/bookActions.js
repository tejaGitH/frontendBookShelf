import { createApiAction } from "../utils/createApiAction";
import axiosInstance from "../utils/axiosInstance";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBestSellers = createApiAction(
    'books/fetchBestSellers',
    ()=>axiosInstance.get('books/best-sellers')
)

export const fetchBookDetails = createApiAction(
    'books/fetchBookDetails',
    (isbn)=> axiosInstance.get(`/books/book-details/${isbn}`)
)
export const searchBooks = createApiAction(
  'books/searchBooks',
  (query) => axiosInstance.get(`/books/search/${query}`)
);

// export const fetchBooks = createApiAction(
//     "books/fetchUserBooks",
//     () => axiosInstance.get("/books/user-books")
//   );


export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async () => {
        const response = await axiosInstance.get("/books/user-books");
        // Assuming the API returns an array of books
        const userBooks = response.data;
        const friendsBooks = response.data.filter(book => book.isFriendBook);
        console.log("friendsBooks",friendsBooks)
        return { userBooks, friendsBooks };
    }
);

// Other action creators...

  
  export const fetchBookById = createApiAction(
    "books/fetchBookById",
    (bookId) => axiosInstance.get(`/books/${bookId}`)
  );
  
  export const addBook = createApiAction(
    "books/addBook",
    async(bookData) =>{
      const response = await axiosInstance.post("/books/add", bookData);
      console.log('Add Book Response:', response);
      return response.data;
    } //axiosInstance.post("/books/add", bookData)
  );
  
  export const updateBook = createApiAction(
    "books/updateBook",
    ({ bookId, updatedData }) =>
      axiosInstance.put(`/books/${bookId}`, updatedData)
  );
  
  export const deleteBook = createApiAction(
    "books/deleteBook",
    async (bookId, {dispatch, rejectWithValue }) => {
      const response = await axiosInstance.delete(`/books/${bookId}`);
      dispatch(removeBookFromState(bookId));
      return response;
    }
  );
  const removeBookFromState = (bookId) => ({
    type: 'books/removeBookFromState',
    payload: bookId,
});

// export const fetchCurrentBooks = createApiAction(
//   "books/fetchCurrentBooks",
//   (_,{rejectWithValue})=>axiosInstance.get(`books/readingBooks`)

// )
// export const fetchReadingProgress = createApiAction(
//   "books/fetchReadingProgress",
//   (bookId,{rejectWithValue})=>axiosInstance.get(`/progress/${bookId}`)
// )

// export const updateReadingProgress = createApiAction(
//   "books/updateReadingProgress",
//   ({bookId, progress, comments},{rejectWithValue})=>axiosInstance.put(`/books/progress/${bookId}`,{progress,comments})
// )




// Fetch Current Books
// export const fetchCurrentBooks = createApiAction(
//     "books/fetchCurrentBooks",
//     () => axiosInstance.get("/books/currently-reading")
// );

// // Fetch Finished Books
// export const fetchFinishedBooks = createApiAction(
//     "books/fetchFinishedBooks",
//     () => axiosInstance.get("/books/finished")
// );






export const fetchReadingProgress = createAsyncThunk(
  'readingProgress/fetchReadingProgress',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`books/progress/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch reading progress');
    }
  }
);

export const updateReadingProgress = createAsyncThunk(
  'readingProgress/updateReadingProgress',
  async ({ bookId, progress, comments }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`books/progress/${bookId}`, { progress, comments });
      // return response.data;
      return { book: bookId, progress, comments };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update reading progress');
    }
  }
);

export const markBookAsFinished = createAsyncThunk(
  'readingProgress/markBookAsFinished',
  async (bookId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`books/finish/${bookId}`);
      
      // Re-fetch finished books after marking as finished
      dispatch(fetchFinishedBooks());
      dispatch(fetchBooks()); // Ensure UserBooks list is updated

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to mark book as finished');
    }
  }
);

export const markBookAsCurrentlyReading = createAsyncThunk(
  'readingProgress/markBookAsCurrentlyReading',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`books/mark-as-reading/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to mark book as currently reading');
    }
  }
);

// export const markBookAsFinished = createAsyncThunk(
//   'readingProgress/markBookAsFinished',
//   async (bookId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`books/finish/${bookId}`);
//       return response.data; // Ensure this returns the updated book
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to mark book as finished');
//     }
//   }
// );

// export const markBookAsCurrentlyReading = createAsyncThunk(
//   'readingProgress/markBookAsCurrentlyReading',
//   async (bookId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`books/mark-as-reading/${bookId}`);
//       return response.data; // Ensure this returns the updated book
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to mark book as currently reading');
//     }
//   }
// );
export const fetchCurrentBooks = createAsyncThunk(
  'readingProgress/fetchCurrentBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('books/currently-reading');
      console.log('Api Response:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('API error', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch currently reading books');
    }
  }
);

export const fetchFinishedBooks = createAsyncThunk(
  'books/fetchFinishedBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('books/finished');
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch finished books');
    }
  }
);


export const fetchFriendsBooks = createAsyncThunk(
    'friendships/fetchFriendsBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/books/friends-books');
            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                return rejectWithValue("Unexpected response format");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch friends books');
        }
    }
);




export const addFriendBookToUser = createAsyncThunk(
    "books/addFriendBookToUser",
    async (bookId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/books/friends-books/${bookId}/add`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to add friend\'s book');
        }
    }
);



export const searchUserBooks = createAsyncThunk(
    "books/searchUserBooks",
    async (query) => {
        const response = await axiosInstance.get(`/books/search/books/${query}`);
        // Ensure that response.data contains userBooks and friendsBooks
        return {
            userBooks: Array.isArray(response.data.userBooks) ? response.data.userBooks : [],
            friendsBooks: Array.isArray(response.data.friendsBooks) ? response.data.friendsBooks : []
        };
    }
);


export const fetchReadingProgressForCurrentBooks = createAsyncThunk(
  'readingProgress/fetchReadingProgressForCurrentBooks',
  async (_, { getState, dispatch }) => {
    const currentlyReadingBooks = getState().books.currentlyReading;
    const promises = currentlyReadingBooks.map((book) => dispatch(fetchReadingProgress(book._id)));
    await Promise.all(promises); // Ensure all progress fetches are completed
  }
);
export const addBookToFavorites = createAsyncThunk(
  "books/addBookToFavorites",
  async (bookId, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.put(`/books/${bookId}/favorite`);
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || "Failed to add book to favorites");
      }
  }
);

export const fetchFavoriteBooks = createAsyncThunk(
  "books/fetchFavoriteBooks",
  async (_, { rejectWithValue }) => {
      try {
          const response = await axiosInstance.get("/books/favorites");
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || "Failed to fetch favorite books");
      }
  }
);
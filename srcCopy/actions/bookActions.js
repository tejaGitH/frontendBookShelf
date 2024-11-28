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
    (query)=> axiosInstance.get(`/books/search/${query}`)
)

export const fetchBooks = createApiAction(
    "books/fetchUserBooks",
    () => axiosInstance.get("/books/user-books")
  );
  
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
export const fetchCurrentBooks = createAsyncThunk(
  'readingProgress/fetchCurrentBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('books/readingBooks');
      console.log('Api Response:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('API error', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch currently reading books');
    }
  }
);

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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update reading progress');
    }
  }
);

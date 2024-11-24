import { createApiAction } from "../utils/createApiAction";
import axiosInstance from "../utils/axiosInstance";


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



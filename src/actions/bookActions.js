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
    (bookData) => axiosInstance.post("/books", bookData)
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

// import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axiosInstance from "../utils/axiosInstance";


// export const getBooks = createAsyncThunk(
//     'books/getBooks',
//     async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if(!token) throw new Error("No token provided");
//             const response = await axios.get(`${API_URL}/best-sellers`,{
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             });
//             console.log(response.data);
//             return response.data.results.books; // Return the list of books
//         } catch (error) {
//             // Handle errors appropriately
//             return Promise.reject(error.response?.data || "Failed to fetch books");
//             //return rejectWithValue(error.response?.data || "Failed to fetch books");
//         }
//     }
// );



// //create a new async thunk to fetch the details of the book
// // src/actions/bookActions.js


// // Create a new async thunk to fetch book details
// export const getBookDetails = createAsyncThunk(
//     'books/getBookDetails',
//     async (isbn, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) throw new Error('No token provided');

//             const response = await axios.get(`${API_URL}/book-details/${isbn}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             return response.data; // Return the book data
//         } catch (error) {
//             return rejectWithValue(error.response?.data || 'Failed to fetch book details');
//         }
//     }
// );

// export const searchBooks = createAsyncThunk(
//     'books/searchBooks',
//     async (query, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) throw new Error('No token provided');

//             const response = await axios.get(`${API_URL}/search/${query}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             return response.data; // Return search results
//         } catch (error) {
//             return rejectWithValue(error.response?.data || 'Failed to search books');
//         }
//     }
// );


// import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axiosInstance from "../utils/axiosInstance";


// // Fetch best sellers
// export const fetchBestSellers = () => async (dispatch) => {
//     dispatch({ type: 'FETCH_BEST_SELLERS_REQUEST' });
//     try {
//         const response = await axiosInstance.get('/books/best-sellers');
//         dispatch({ type: 'FETCH_BEST_SELLERS_SUCCESS', payload: response.data });
//     } catch (error) {
//         console.error("Error fetching best sellers:", error); // Optional logging
//         dispatch({ 
//             type: 'FETCH_BEST_SELLERS_FAILURE', 
//             payload: error.response?.data?.message || error.message 
//         });
//     }
// };

// // Fetch book details
// export const fetchBookDetails = (isbn) => async (dispatch) => {
//     dispatch({ type: 'FETCH_BOOK_DETAILS_REQUEST' });
//     try {
//         const response = await axiosInstance.get(`/books/book-details/${isbn}`);
//         dispatch({ type: 'FETCH_BOOK_DETAILS_SUCCESS', payload: response.data });
//     } catch (error) {
//         console.error("Error fetching book details:", error); // Optional logging
//         dispatch({ 
//             type: 'FETCH_BOOK_DETAILS_FAILURE', 
//             payload: error.response?.data?.message || error.message 
//         });
//     }
// };

// // Search books
// export const searchBooks = (query) => async (dispatch) => {
//     dispatch({ type: 'SEARCH_BOOKS_REQUEST' });
//     try {
//         const response = await axiosInstance.get(`/books/search/${query}`);
//         dispatch({ type: 'SEARCH_BOOKS_SUCCESS', payload: response.data });
//     } catch (error) {
//         console.error("Error searching books:", error); // Optional logging
//         dispatch({ 
//             type: 'SEARCH_BOOKS_FAILURE', 
//             payload: error.response?.data?.message || error.message 
//         });
//     }
// };

// //db actions
// export const fetchBooks = createAsyncThunk(
//     'books/fetchUserBooks',
//     async(_,{rejectWithValue})=>{
//         try{
//             const response = await axiosInstance.get('books/user-books');
//             console.log("API response:", response.data);
//             return response.data;
//         }catch(error){
//             console.error("Fetch books error:", error); 
//             return rejectWithValue(error.response?.data || 'unexpecteded error');
//         }
//     }
// )

// export const fetchBookById = createAsyncThunk(
//     'books/fetchbookById',
//     async(bookId, {rejectWithValue})=>{
//         try{
//             const response = await axiosInstance.get(`/books/${bookId}`);
//             return response.data;
//         }catch(error){
//             return rejectWithValue(error.response?.data || `failed to fetch book with ID: ${bookId}`);
//         }
//     }
// )

// export const addBook = createAsyncThunk(
//     'books/addBook',
//     async (bookData,{rejectWithValue}) => {
//        try{
//         const response = await axiosInstance.post(`/books`, bookData);
//         return response.data;
//        }catch(error){
//             return rejectWithValue(error.response?.data || `failed to add book`);
//         }
//     }
// );

// export const deleteBook = createAsyncThunk(
//     'books/deleteBook',
//     async (bookId, {dispatch, rejectWithValue }) => {
//         try{
//             console.log("actionBookId",bookId);
//             const response = await axiosInstance.delete(`books/${bookId}`);
//             //Dispatch custom action to remove book from the store;
//             dispatch(removeBookFromState(bookId));
//             return response.data;
//         }catch(error){
//             return rejectWithValue(error.response?.data || `failed to delete book`);
//         }       
//     }
// );

// // Custom action to remove the book from state after deletion
// const removeBookFromState = (bookId) => ({
//     type: 'books/removeBookFromState',
//     payload: bookId,
// });


// export const updateBook = createAsyncThunk(
//     'books/updateBook',
//     async ({ bookId, updatedData }, { rejectWithValue }) => {
//        try{
//         const response = await axiosInstance.put(`/books/${bookId}`, updatedData);
//         return response.data;
//        }catch(error){
//             return rejectWithValue(error.response?.data || `failed to update book with ID: ${bookId}`);
//         }
//     }
// );

// // export const markAsCurrentlyReading = createAsyncThunk(
// //     'books/markAsCurrentlyReading',
// //     async(bookId)=>{
// //         const token = localStorage.getItem('token');
// //         const response = await axios.post(`${API_URL}/update-progress/${bookId}`,{status: "Currently Reading"},{
// //             headers: {Authorization: `Bearer ${token}`},
// //         });
// //         return response.data;
// //     }
// // )

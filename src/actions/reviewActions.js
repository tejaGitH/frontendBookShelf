import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { fetchSocialUpdates } from './friendshipActions';

// // Add a review for a book
// export const addReview = createAsyncThunk(
//   'reviews/addReview',
//   async ({ bookId, reviewData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`/reviews/${bookId}/reviews`, reviewData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to add review');
//     }
//   }
// );



export const addReview = createAsyncThunk(
  'reviews/addReview',
  async ({ bookId, reviewData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/reviews/${bookId}/reviews`, reviewData);
      if (response.data && response.data.updates) {
          dispatch(fetchSocialUpdates(response.data.updates)); // Fetch social updates after adding a review
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add review');
    }
  }
);

// Other actions remain unchanged


// Get reviews for a specific book
export const getReviewsForBook = createAsyncThunk(
  'reviews/getReviewsForBook',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/reviews/${bookId}/reviews`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch reviews');
    }
  }
);

// Update a review
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/reviews/${reviewId}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update review');
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete review');
    }
  }
);



export const likeReview = createAsyncThunk(
  'reviews/likeReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/reviews/${reviewId}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to like review');
    }
  }
);

export const addComment = createAsyncThunk(
  'reviews/addComment',
  async ({ reviewId, comment }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/reviews/${reviewId}/comments`, { comment });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add comment');
    }
  }
);

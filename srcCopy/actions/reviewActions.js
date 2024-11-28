import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Add a review for a book
export const addReview = createAsyncThunk(
  'reviews/addReview',
  async ({ bookId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/books/${bookId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add review');
    }
  }
);

// Get reviews for a specific book
export const getReviewsForBook = createAsyncThunk(
  'reviews/getReviewsForBook',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/books/${bookId}/reviews`);
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
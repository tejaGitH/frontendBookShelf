import { createSlice } from "@reduxjs/toolkit";
import { addReview, getReviewsForBook, updateReview, deleteReview } from "../actions/reviewActions";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload); // Add new review to reviews list
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add review";
      })
      
      // Get Reviews for a Book
      .addCase(getReviewsForBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsForBook.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload; // Set reviews for the book
      })
      .addCase(getReviewsForBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reviews";
      })

      // Update Review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex((review) => review._id === action.payload._id);
        if (index !== -1) {
          state.reviews[index] = action.payload; // Replace updated review
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update review";
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter((review) => review._id !== action.payload._id); // Remove deleted review
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete review";
      });
  },
});

export default reviewSlice.reducer;
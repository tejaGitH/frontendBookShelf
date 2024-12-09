import { createSlice } from '@reduxjs/toolkit';
import { addReview, getReviewsForBook, updateReview, deleteReview, likeReview, addComment } from '../actions/reviewActions';


const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.loading = false;
                console.log("reviewadded",action.payload.review)
                if (action.payload && action.payload.message === "Review added successfully") {
                    state.reviews.push(action.payload.review);
                }
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add review";
            })
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
            })
            .addCase(likeReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(likeReview.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.reviews.findIndex((review) => review._id === action.payload._id);
                if (index !== -1) {
                    state.reviews[index] = action.payload; // Update review with new like data
                }
            })
            .addCase(likeReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to like review";
            })
            .addCase(addComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.reviews.findIndex((review) => review._id === action.payload._id);
                if (index !== -1) {
                    state.reviews[index] = action.payload; // Update review with new comment data
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add comment";
            });
    },
});

export default reviewSlice.reducer;

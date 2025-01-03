import { createSlice } from '@reduxjs/toolkit';
import { addReview, getReviewsForBook, updateReview, deleteReview, likeReview, addComment } from '../actions/reviewActions';


const initialState = {
    reviews: [],
    socialUpdates: [],
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
                console.log("Action Payload:", action.payload);
console.log("Current State Reviews:", state.reviews);
                state.reviews = action.payload || []; // Set reviews for the book
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
            // .addCase(likeReview.fulfilled, (state, action) => {
            //     state.loading = false;
            //     console.log("like",action.payload);
            //     const index = state.reviews.findIndex((review) => review._id === action.payload._id);
            //     if (index !== -1) {
            //         state.reviews[index] = action.payload; // Update review with new like data
            //     }
            // })
            .addCase(likeReview.fulfilled, (state, action) => {
                state.loading = false;
            
                // Find the review to update in the state
                const index = state.reviews.findIndex((review) => review._id === action.payload._id);
                if (index !== -1) {
                    // Replace the old review with the updated one (including new likes)
                    state.reviews[index] = action.payload;
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
                const { reviewId, comment } = action.payload; // Assuming the payload contains reviewId and the new comment
            
                if (Array.isArray(state.socialUpdates)) {
                    const reviewIndex = state.socialUpdates.findIndex((review) => review._id === reviewId);
                    if (reviewIndex !== -1) {
                        state.socialUpdates[reviewIndex].comments.push(comment); // Append the new comment
                    }
                } else {
                    console.error("socialUpdates is not an array:", state.socialUpdates);
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add comment";
            });
    },
});

export default reviewSlice.reducer;

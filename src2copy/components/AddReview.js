import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddReview = ({ bookId }) => {
    const [reviewText, setReviewText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement addReview action and dispatch it here
        // dispatch(addReview({ bookId, reviewText }));
        setReviewText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea placeholder="Write your review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default AddReview;
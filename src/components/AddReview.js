import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../actions/reviewActions';

const AddReview = ({ bookId, onReviewSubmit }) => {
    const [reviewText, setReviewText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addReview({ bookId, reviewText}))
        .then(()=>{
            setReviewText('');
            onReviewSubmit();
        })
        .catch((error)=>{
            console.error('Review Submission failed');
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea placeholder="Write your review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default AddReview;
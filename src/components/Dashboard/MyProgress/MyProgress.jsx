import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks, fetchFinishedBooks, markBookAsFinished } from '../../../actions/bookActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/MyProgress.css';

const MyProgress = () => {
    const dispatch = useDispatch();
    const { currentlyReading, finishedBooks, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchCurrentBooks());
        dispatch(fetchFinishedBooks());
    }, [dispatch]);

    const handleMarkAsFinished = (bookId) => {
        dispatch(markBookAsFinished(bookId));
    };

    const truncateReview = (text, length = 100) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    return (
   <h1>MyProgress</h1>
    );
};

export default MyProgress;

import React, { useState } from 'react';
import CurrentBooks from './CurrentBooks';
import FinishedBooks from './FinishedBooks';
import './MyProgress.css';



const MyProgress = () => {
    return (
        <div className="my-progress">
            <h2>My Progress</h2>
            <div className="books-container">
                <div className="book-section">
                    <CurrentBooks />
                </div>
                <div className="book-section">
                    <FinishedBooks />
                </div>
            </div>
        </div>
    );
};

export default MyProgress;

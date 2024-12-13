import React from 'react';
import DashBoardCurrentBooks from './DashBoardCurrentBooks';
import DashBoardFinishedBooks from './DashBoardFinishedBooks';
import './MyProgress.css';

const MyProgress = ({ onSelectBook }) => {
    return (
        <div className="my-progress">
            <div className="current-books-container">
                <DashBoardCurrentBooks onSelect={onSelectBook} />
            </div>
            <div className="finished-books-container">
                <DashBoardFinishedBooks />
            </div>
        </div>
    );
};

export default MyProgress;
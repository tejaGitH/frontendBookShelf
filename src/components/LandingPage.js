// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to BookShelf</h1>
            <p style={styles.description}>
                Your personal book collection and social network for book lovers. 
                Connect with others, share your favorite books, and track your reading progress.
            </p>
            <div style={styles.buttonContainer}>
                <Link to="/login">
                    <button style={styles.button}>Login</button>
                </Link>
                <Link to="/register">
                    <button style={styles.button}>Register</button>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f4f4f9',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '20px',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: '30px',
        color: '#555',
        maxWidth: '500px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '15px',
    },
    button: {
        padding: '12px 25px',
        fontSize: '1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

export default LandingPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../actions/userActions'; // Action to fetch user profile
import './DashboardProfile.css';

const DashboardProfile = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile); // Assuming the user profile is stored in `state.user.profile`
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        dispatch(fetchUserProfile()); // Fetch user profile on component mount
    }, [dispatch]);

    return (
        <div className="dashboard-profile">
            {loading ? (
                <p>Loading profile...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : userProfile ? (
                <div className="profile-container">
                    <div className="profile-img-container">
                        <img
                            src={userProfile.profilePic || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="profile-img"
                        />
                    </div>
                    <div className="profile-info">
                        <h2>{userProfile.username}</h2>
                        <p>{userProfile.email}</p>
                    </div>
                </div>
            ) : (
                <p>No profile available.</p>
            )}
        </div>
    );
};

export default DashboardProfile;
import React from 'react';
import { useLocation } from 'react-router-dom';

function ProfileCard() {
    const location = useLocation();
    const { name, age, bio } = location.state || {};

    return (
        <div className="container">
            <h1>Profile Card</h1>
            <div className="profile-card">
                <h2>{name}</h2>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Bio:</strong> {bio}</p>
            </div>
        </div>
    );
}

export default ProfileCard;

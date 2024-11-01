import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Home3 = () => {
    return (
        <div className="home-container">
            <div className="center-box">
                <h2 className="center-question">What do you want to do today?</h2>
                <div className="options">
                    <Link to="/mood-tracker" className="option-button" data-hover="Track and reflect on how you're feeling today.">
                        Check Your Mood
                    </Link>
                    <Link to="/journals" className="option-button" data-hover="Write about your day and organize your thoughts.">
                        Write in Your Journal
                    </Link>
                    <Link to="/resources" className="option-button" data-hover="Access helpful mental health and wellness resources.">
                        Wellness Resources
                    </Link>
                    <Link to="/reminders" className="option-button" data-hover="Set reminders to help you stay connected and grounded.">
                        Set Reminders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home3;

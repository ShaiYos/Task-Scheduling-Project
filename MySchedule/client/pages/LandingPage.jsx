import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container">
            <h1>Welcome to Task Scheduling App</h1>
            <div style={{width: 1000}}>your ultimate tool for managing and scheduling your tasks efficiently. Our app offers a minimalistic design and user-friendly interface to help you stay organized and productive.</div>
            <div>With our app, you can:</div>
            <div>-Create and manage tasks</div>
            <div>-Set deadlines and reminders</div>
            <div>-Track your progress</div>
            <div>-Collaborate with others</div>
            <div className="buttons">
                <Link style={{marginRight: 5}} to="/get-started" className="button">Get Started</Link>
                <Link style={{marginRight: 5}} to="/login" className="button">Login</Link>
                <Link style={{marginRight: 5}} to="/register" className="button">Register</Link>
            </div>
        </div>
    );
}

export default LandingPage;

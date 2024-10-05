import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../src/components/ThemeContext'; // Assuming you have a ThemeContext
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
    const { mode } = useThemeContext(); // Get the current theme mode

    return (
        <div className={`container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}> {/* Main container for the page */}
            <h1 className="title">Welcome to Task Scheduling Web App</h1>
            <div className="description">
                Your ultimate tool for managing and scheduling your tasks efficiently. Our app offers a minimalistic design and user-friendly interface to help you stay organized and productive.
            </div>
            <div className="features">
                With our app, you can:
                <ul>
                    <li>Create and manage tasks</li>
                    <li>Set deadlines and reminders</li>
                    <li>Track your progress</li>
                    <li>Collaborate with others</li>
                </ul>
            </div>
            <div className="buttons"> {/* Buttons for navigating to different pages: Get Started, Login, and Register */}
                <Link to="/get-started" className="button">Get Started</Link>
                <Link to="/login" className="button">Login</Link>
                <Link to="/register" className="button">Register</Link>
            </div>
        </div>
    );
}

export default LandingPage;
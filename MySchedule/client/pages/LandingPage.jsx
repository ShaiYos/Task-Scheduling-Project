import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    console.log("LandingPage");
    return (
        <div className="container">
            <h1>Task Scheduling</h1>
            <p>Schedule your tasks with ease. Minimal design and easy to use.</p>
            <div className="buttons">
                <Link to="/get-started" className="button">Get Started</Link>
                <Link to="/login" className="button">Login</Link>
                <Link to="/register" className="button">Register</Link>
            </div>
        </div>
  );
}

export default LandingPage;

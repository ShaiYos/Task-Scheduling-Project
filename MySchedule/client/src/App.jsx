import React, { useState } from 'react';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import TaskSchedulerPage from '../pages/TaskSchedulerPage/TaskSchedulerPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import ModeToggle from './components/ModeToggle';
import Box from '@mui/material/Box';
import { useLoginContext } from './components/LoginContext.jsx';
import Sidebar from './components/SideBar/Sidebar.jsx';
import HomePage from '../pages/HomePage/HomePage';
import MotivationQuotesPage from '../pages/MotivationalQuotesPage/MotivationalQuotesPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx';
 
import './App.css';


const App = () => {
  const { loggedIn } = useLoginContext(); // Check if user is logged in
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle the sidebar
  };

  return (
    <>
      <ModeToggle />
      <Box id="root" sx={{ 
        position: 'relative', display: 'flex'}}>
            {/* Sidebar Component */}
            <Sidebar 
              open={isSidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
              toggleSidebar={toggleSidebar} 
            />
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3, ml: loggedIn ? (isSidebarOpen ? 30 : 0) : 0 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/task-scheduler"
              element={loggedIn ? <TaskSchedulerPage /> : <Navigate to="/login" />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/motivation" element={<MotivationQuotesPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;

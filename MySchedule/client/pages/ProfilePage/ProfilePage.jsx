// ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Avatar, Typography, Divider, CircularProgress } from "@mui/material"; // All Material UI imports in one line
import { useThemeContext } from "../../src/components/ThemeContext"; // Import ThemeContext

import "./ProfilePage.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const userId = localStorage.getItem('userId'); // Retrieve userId directly on component load
    const { mode } = useThemeContext(); // Get mode from ThemeContext

    useEffect(() => {
        if (!userId) {
            console.error("No userId found");
            setError("User not found");
            setLoading(false); // Set loading to false if no userId
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/profile/${userId}`);
                setUser(response.data);
                console.log("User data:", response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load user data");
            } finally {
                setLoading(false); // Reset loading state after fetching
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress /> {/* Display loading spinner */}
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h5">{error}</Typography>;
    }

    // Determine the avatar image based on user input or gender
    const getAvatarImage = () => {
        if (user.image) {
            return user.image; // User uploaded image
        } else {
            // Default images based on gender
            switch (user.gender) {
                case 'male':
                    return '/male-user.png'; // Replace with your male default image path
                case 'female':
                    return '/female-user.jpg'; // Replace with your female default image path
                default:
                    return '/default-user.png'; // Replace with your default image path for other
            }
        }
    };

    return (
        <Card className={`profile-card ${mode}`} sx={{ backgroundColor: mode === 'dark' ? '#333' : '#eaeaea' }}>
            <CardContent>
                <Box className="profile-avatar-box">
                    <Avatar src={getAvatarImage()} alt="User Avatar" sx={{ width: 200, height: 200, mb: 2 }} />
                    <Typography variant="h5">{user.username}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body1"><strong>Gender:</strong> {user.gender}</Typography>
                <Typography variant="body1"><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProfilePage;

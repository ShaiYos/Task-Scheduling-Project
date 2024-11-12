import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Card,
    CardContent,
    Avatar,
    Typography,
    Divider,
    CircularProgress,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { useThemeContext } from "../../src/components/ThemeContext";

import "./ProfilePage.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editValues, setEditValues] = useState({ username: "", email: "" });
    const [editError, setEditError] = useState("");

    const userId = localStorage.getItem("userId");
    const { mode } = useThemeContext();

    useEffect(() => {
        if (!userId) {
            setError("User not found");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/user/profile/${userId}`);
                setUser(response.data);
                setEditValues({ username: response.data.username, email: response.data.email });
            } catch (error) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleEditOpen = () => setIsEditOpen(true);
    const handleEditClose = () => {
        setIsEditOpen(false);
        setEditError("");
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditValues({ ...editValues, [name]: value });
    };

    const checkUsernameAvailability = async (username) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/user/check-username/${username}`);
            return response.data.isAvailable;
        } catch (error) {
            console.error("Error checking username availability:", error);
            return false;
        }
    };

    const handleSaveChanges = async () => {
        console.log("Save changes:", editValues);

        // Check if the email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editValues.email)) {
            setEditError("Please enter a valid email address.");
            return;
        }

        if (editValues.username !== user.username) {
            const isAvailable = await checkUsernameAvailability(editValues.username);
            if (!isAvailable) {
                setEditError("Username is already taken, please choose another.");
                return;
            }
        }

        try {
            const response = await axios.put(`${BACKEND_URL}/api/user/profile/${userId}`, editValues);
            setUser(response.data);
            handleEditClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            setEditError("An error occurred while updating the details.");
        }
    };
    const getAvatarImage = () => {
        if (user?.image) return user.image;
        switch (user?.gender) {
            case "male": return "/male-user.png";
            case "female": return "/female-user.jpg";
            default: return "/default-user.png";
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h5">{error}</Typography>;
    }

    return (
        <Box className={`profile-page ${mode}`}>
            <Card className={`profile-card ${mode}`} sx={{ backgroundColor: mode === "dark" ? "#333" : "#eaeaea" }}>
                <CardContent>
                    <Box className="profile-avatar-box" sx={{ position: "relative", textAlign: "center" }}>
                        <Avatar src={getAvatarImage()} alt="User Avatar" sx={{ width: 150, height: 150, mb: 2 }} />
                        <Typography variant="h5">{user.username}</Typography>
                        <Button variant="contained" color="primary" onClick={handleEditOpen} sx={{ mt: 2 }}>
                            Edit Profile
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box className="profile-details">
                        <Typography variant="body1">
                            <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Gender:</strong> {user.gender}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={isEditOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    {editError && (
                        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                            {editError}
                        </Typography>
                    )}
                    <TextField
                        label="Username"
                        name="username"
                        value={editValues.username}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={editValues.email}
                        onChange={handleEditChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleSaveChanges} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfilePage;

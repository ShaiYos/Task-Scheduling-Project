

import express from "express"
import { createUser, loginUser, getUserProfile, checkUsernameAvailability, updateUserProfile } from "../controllers/UserController.js"

const router = express.Router()

// POST request for the "/login" endpoint
// This will call the loginUser function from the UserController when the route is accessed
router.post("/login", loginUser)

// POST request for the "/register" endpoint
// This will call the createUser function from the UserController when the route is accessed
router.post("/register", createUser)

// Route to get user profile by ID
router.get("/profile/:id", getUserProfile)

// PUT request to update user profile by ID
router.put("/profile/:userId", updateUserProfile);

// Route to check if a username is available
router.get("/check-username/:username", checkUsernameAvailability);

export default router
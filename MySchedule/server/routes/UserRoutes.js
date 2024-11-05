

import express from "express"
import { createUser, loginUser , getUserProfile} from "../controllers/UserController.js"
import { get } from "mongoose"

const router = express.Router()

// POST request for the "/login" endpoint
// This will call the loginUser function from the UserController when the route is accessed
router.post("/login", loginUser)

// POST request for the "/register" endpoint
// This will call the createUser function from the UserController when the route is accessed
router.post("/register", createUser)

// Route to get user profile by ID
router.get("/profile/:id", getUserProfile)

export default router
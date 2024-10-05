

import express from "express"
import { createUser, loginUser } from "../controllers/UserController.js"

const router = express.Router()

// POST request for the "/login" endpoint
// This will call the loginUser function from the UserController when the route is accessed
router.post("/login", loginUser)

// POST request for the "/register" endpoint
// This will call the createUser function from the UserController when the route is accessed
router.post("/register", createUser)

export default router
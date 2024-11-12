import { hashPassword } from "../utils/hashPassword.js";
import {
    createUserService,
    getUserByUsernameService,
    getUserDetailsService,
    updateUserProfileService
} from "../services/UserServices.js";
import { serverResponse } from "../utils/serverResponse.js";
import { comparePasswords } from "../utils/comparePasswords.js";


// Create new user
export const createUser = async (req, res) => {
    console.log("Registration request received:", req.body); // Check the request body
    try {
        const { username, email, password, gender, dateOfBirth, image } = req.body;

        // Check if user already exists
        const existingUser = await getUserByUsernameService(username);
        if (existingUser) {
            return serverResponse(res, 409, { error: 'User already exists' });
        }

        // If not exist, create new user
        const hashedPassword = await hashPassword(password);
        const newUser = await createUserService({
            username,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth,
            image
        });
        console.log('New user created:', newUser);

        // Respond with the newly created user
        serverResponse(res, 201, newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        serverResponse(res, 500, { error: 'Server error' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    console.log("Login request received:", req.body);

    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return serverResponse(res, 400, "Username and password are required");
        }

        // Fetch the user by username
        const user = await getUserByUsernameService(username);

        if (!user) {
            // User not found
            return serverResponse(res, 401, "Invalid username or password");
        }

        // Compare passwords
        const isValidPassword = comparePasswords(password, user.password);

        if (!isValidPassword) {
            // Password is incorrect
            return serverResponse(res, 401, "Invalid username or password");
        }

        // If authentication is successful, respond with user data (avoid sending password)
        serverResponse(res, 200, { message: "Login successful", userId: user._id });
    } catch (error) {
        console.error("Error in loginUser:", error);
        serverResponse(res, 500, error.message);
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await getUserDetailsService(req.params.id); // Await the service call
        console.log("User found:", user); // Log the user found
        if (!user) {
            return serverResponse(res, 404, { error: 'User not found' });
        }
        serverResponse(res, 200, user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        serverResponse(res, 500, { error: 'Server error' });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    console.log("Received update request for user:", req.params.userId);
    console.log("Update data:", req.body);
    const userId = req.params.userId;
    const updateData = req.body;
    console.log("Update request received:", updateData);

    try {
        const existingUser = await getUserByUsernameService(updateData.username);
        if (existingUser && existingUser._id.toString() !== userId) {
            return serverResponse(res, 400, { message: "Username is already taken" });
        }

        const updatedUser = await updateUserProfileService(userId, updateData);
        serverResponse(res, 200, updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        serverResponse(res, 500, { message: "Error updating user profile" });
    }
};

// Check username availability
export const checkUsernameAvailability = async (req, res) => {
    const username = req.params.username;
    try {
        const existingUser = await getUserByUsernameService(username);
        const isAvailable = !existingUser;
        serverResponse(res, 200, { isAvailable });
    } catch (error) {
        console.error("Error checking username availability:", error);
        serverResponse(res, 500, { message: "Error checking username availability" });
    }
};

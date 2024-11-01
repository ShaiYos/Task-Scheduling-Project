import { hashPassword } from "../utils/hashPassword.js";
import { createUserService, getUserByUsernameService } from "../services/UserServices.js";
import { serverResponse } from "../utils/serverResponse.js";
import { comparePasswords } from "../utils/comparePaswwords.js";


export const createUser = async (req, res) => {
  console.log("Registration request received:", req.body);
  try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await getUserByUsernameService(username);
      if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
      }

      // If not exist, create new user
      const hashedPassword = await hashPassword(password);
      const newUser = await createUserService({ username, email, password: hashedPassword });

      // Respond with the newly created user
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

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
        return serverResponse(res, 200, { message: "Login successful", userId: user._id });
    } catch (error) {
        console.error("Error in loginUser:", error);
        return serverResponse(res, 500, error.message);
    }
};



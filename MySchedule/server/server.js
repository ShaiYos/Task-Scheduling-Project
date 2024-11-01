import express from 'express';
import cors from 'cors'; // Import CORS middleware to enable cross-origin resource sharing
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRoutes.js'; 
import taskRoutes from './routes/TaskRoutes.js';

const dbURI = process.env.MONGODB_URI;

const port = 3000; // Define the port on which the server will listen
const app = express();

app.use(cors()); // Enable CORS for all routes and origins
app.use(express.json()); // Parses incoming JSON requests
// Connect to MongoDB using the provided connection string (dbURI)

mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Define routes for the app using the imported UserRoutes
app.use('/', UserRoutes);
app.use('/', taskRoutes); 

// Start the server and have it listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
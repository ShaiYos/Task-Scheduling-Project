import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRoutes.js'; 
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB

const dbURI = 'mongodb+srv://admin:admin@cluster0.ebnx4.mongodb.net/TaskScheduling?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Define routes
app.use('/', UserRoutes); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
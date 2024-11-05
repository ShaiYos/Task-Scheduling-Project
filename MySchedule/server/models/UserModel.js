// user model
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], 
        required: true, 
    },
    dateOfBirth: {
        type: Date,
        required: true, 
    },
    image: {
        type: String, 
        required: false, 
    }
}); 

export const UserModel = mongoose.model("User", userSchema);

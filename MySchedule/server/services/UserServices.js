import { UserModel } from "../models/UserModel.js";

// export const getAllUsersService = () => UserModel.find({});

// service to get specific user by his id
export const getUserByIdService = async (userId) => UserModel.findById(userId);

// service to ceate new user 
export const createUserService = async (user) => UserModel.create(user);

// service to check if the username is unique
export const getUserByUsernameService = async (username) => {
    return await UserModel.findOne({ username });
}

// service to get user details (minus password) by his id 
export const getUserDetailsService = async (userId) => {
    return await UserModel.findById(userId).select('-password'); // Return the result
};

// service to update user details
export const updateUserProfileService = async (userId, updateData) => {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};
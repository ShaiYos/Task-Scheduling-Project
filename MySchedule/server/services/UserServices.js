import { UserModel } from "../models/UserModel.js";


//export const getAllUsersService = () => UserModel.find({});

// service to get specific user by his id
export const getUserByIdService = async (userId) => UserModel.findById(userId);

// service to ceate new user 
export const createUserService = async (user) => UserModel.create(user);

// service to check if the username is unique
export const getUserByUsername = async (username) => {
  try {
    if (!username) {
      throw new Error('Username is required');
    }
    
    const user = await UserModel.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw new Error('Could not fetch user');
  }
};

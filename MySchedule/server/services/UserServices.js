import { UserModel } from "../models/UserModel.js";


//export const getAllUsersService = () => UserModel.find({});

// service to get specific user by his id
export const getUserByIdService = async (userId) => UserModel.findById(userId);

// service to ceate new user 
export const createUserService = async (user) => UserModel.create(user);

// service to check if the username is unique
export const getUserByUsername = async (username) =>
  UserModel.findOne({ username: username });


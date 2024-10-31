import { TaskModel } from '../models/TaskModel.js';

// Function to add a new task
export const addTaskService = async (userId, description, date) => {
    console.log(`Adding task for userId: ${userId}, description: ${description}, date: ${date}`);
    const newTask = new TaskModel({
        description,
        dueDate: new Date(date), // Ensure date is a Date object without adding 3 hours
        finished: false, // New tasks are not finished by default
        userId, // Reference to the user who created the task
    });

    return await newTask.save(); // Save and return the new task
};

// Function to edit an existing task
export const editTaskService = async (taskId, updates) => {
    console.log(`Editing task with taskId: ${taskId}, updates: ${JSON.stringify(updates)}`);
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators run on update
    });

    return updatedTask; // Return the updated task
};

// Function to mark a task as finished
export const markTaskAsFinishedService = async (taskId) => {
    console.log(`Marking task as finished with taskId: ${taskId}`);
    return await TaskModel.findByIdAndUpdate(taskId, { finished: true }, { new: true });
};

// Function to delete a task
export const deleteTaskService = async (taskId) => {
    console.log(`Deleting task with taskId: ${taskId}`);
    await TaskModel.findByIdAndDelete(taskId);
    return { message: 'Task deleted successfully' };
};

// Function to fetch all tasks for a specific user
export const getAllTasksService = async (userId) => {
    console.log(`Fetching all tasks for userId: ${userId}`);
    return await TaskModel.find({ userId });
};


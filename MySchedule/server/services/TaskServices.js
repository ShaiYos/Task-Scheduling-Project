import TaskModel from '../models/TaskModel';

// Function to add a new task
const addTask = async (userId, description, date) => {
    const newTask = new Task({
        description,
        date: new Date(date), // Ensure date is a Date object,
        finished: false, // New tasks are not finished by default
        user: userId, // Reference to the user who created the task
    });

    return await newTask.save(); // Save and return the new task
};

// Function to edit an existing task
const editTask = async (taskId, updates) => {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators run on update
    });

    return updatedTask; // Return the updated task
};

// Function to mark a task as finished
const markTaskAsFinished = async (taskId) => {
    return await Task.findByIdAndUpdate(taskId, { finished: true }, { new: true });
};

// Function to delete a task
const deleteTask = async (taskId) => {
    await Task.findByIdAndDelete(taskId);
    return { message: 'Task deleted successfully' };
};

// Export the task services
module.exports = {
    addTask,
    editTask,
    markTaskAsFinished,
    deleteTask,
};
import { addTaskService, editTaskService, markTaskAsFinishedService, deleteTaskService, getAllTasksService } from "../services/TaskServices.js";

// Add a new task
export const addTask = async (req, res) => {
    try {
        const { userId, description, dueDate } = req.body;

        if (!userId || !description || !dueDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log(`Adding task: userId=${userId}, description=${description}, dueDate=${dueDate}`);
        const newTask = await addTaskService(userId, description, dueDate);

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error adding task:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Edit an existing task
export const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        console.log(`Request to edit task: id=${id}, updates=${JSON.stringify(updates)}`);
        const updatedTask = await editTaskService(id, updates);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error editing task:', error);
        res.status(500).json({ message: error.message });
    }
};

// Mark a task as finished
export const markTaskAsFinished = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Request to mark task as finished: id=${id}`);
        const updatedTask = await markTaskAsFinishedService(id);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error marking task as finished:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Request to delete task: id=${id}`);
        await deleteTaskService(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: error.message });
    }
};

// Fetch all tasks for a specific user
export const getAllTasks = async (req, res) => {
    try {
        const { userId } = req.query; // Get userId from query parameters
        console.log(`Request to fetch all tasks for userId: ${userId}`);
        const tasks = await getAllTasksService(userId);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: error.message });
    }
};
import React, { useState, useEffect } from 'react';
import CustomCalendar from '../../src/components/CustomCalendar/CustomCalendar'; // Adjust this path
import CustomDialog from '../../src/components/CustomDialog';
import AddTaskForm from '../../src/components/AddTaskForm'; // Adjust this path
import EditTaskForm from '../../src/components/EditTaskForm'; // Adjust this path
import { Box } from '@mui/material';
import { useThemeContext } from "../../src/components/ThemeContext";
import axios from 'axios';

const TaskSchedulerPage = () => {
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [showAddForm, setShowAddForm] = useState(false); // To show AddTaskForm
    const [showEditForm, setShowEditForm] = useState(false); // To show EditTaskForm
    const [selectedTask, setSelectedTask] = useState(null); // Selected task for editing

    const { mode } = useThemeContext();

    // Fetch tasks from the database on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks', {
                    params: { userId: localStorage.getItem('userId') }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Show an error message to the user
            }
        };

        fetchTasks();
    }, []);

    // Add a new task and save to the database
    const handleAddTask = async (newTask) => {
        const userId = localStorage.getItem('userId');
        try {
            // Send the new task to the server
            const response = await axios.post('/api/task/addTask', {
                ...newTask,
                userId
            });

            // Update state with the saved task from the server (including the ID from DB)
            setTasks([...tasks, response.data]);
            setShowAddForm(false); // Hide the AddTaskForm after submission
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Edit a task and save changes to the database
    const handleEditTask = async (updatedTask) => {
        try {
            // Send the updated task to the server
            const response = await axios.put(`/api/task/editTask/${updatedTask._id}`, updatedTask);

            // Update the tasks state with the updated task from the server
            const updatedTasks = tasks.map((task) =>
                task._id === updatedTask._id ? response.data : task
            );
            setTasks(updatedTasks);
            setShowEditForm(false); // Hide the EditTaskForm after submission
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Handle task click for editing
    const handleEventClick = (info) => {
        const taskToEdit = tasks.find((task) => task._id === info.event.id);
        setSelectedTask(taskToEdit);
        setShowEditForm(true);
    };

    // Handle date click for adding a task
    const handleDateClick = () => {
        setShowAddForm(true);
    };

    const handleDeleteTask = async () => {
        try {
            await axios.delete(`/api/task-scheduler/${selectedTask._id}`);
            setTasks(tasks.filter(task => task._id !== selectedTask._id));
            setShowEditForm(false);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <Box className="task-shceduler-page" >
            {/* Custom Calendar Component */}
            <CustomCalendar
                tasks={tasks}
                handleDateClick={handleDateClick} // Handle adding new tasks
                handleEventClick={handleEventClick} // Handle task click to edit
                onEventDrop={async (info) => {
                    const updatedTasks = tasks.map((task) =>
                        task._id === info.event.id
                            ? { ...task, dueDate: info.event.start }
                            : task
                    );
                    setTasks(updatedTasks);

                    try {
                        // Send the updated task to the backend
                        await axios.put(`/api/task/editTask/${info.event.id}`, {
                            dueDate: info.event.start,
                        });
                    } catch (error) {
                        console.error("Error updating task date:", error);
                    }
                }}
                mode={mode} // or dark mode depending on user preference
            />

            {/* Add Task Dialog */}
            <CustomDialog
                open={showAddForm}
                onClose={() => setShowAddForm(false)}
                title="Add New Task"
                onSubmit={handleAddTask}
                submitLabel="Add Task"
            >
                <AddTaskForm onSubmit={handleAddTask} />
            </CustomDialog>

            {/* Edit Task Dialog */}
            {selectedTask && (
                <CustomDialog
                    open={showEditForm}
                    onClose={() => setShowEditForm(false)}
                    title="Edit Task"
                    onSubmit={() => handleEditTask(selectedTask)}
                    submitLabel="Save Changes"
                >
                    <EditTaskForm
                        event={selectedTask}
                        onSubmit={handleEditTask}
                    />
                </CustomDialog>
            )}
        </Box>
    );
};

export default TaskSchedulerPage;

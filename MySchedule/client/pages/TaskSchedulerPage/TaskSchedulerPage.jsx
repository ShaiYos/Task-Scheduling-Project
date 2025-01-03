import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../../src/components/ThemeContext';
import { AddTaskForm, EditTaskForm } from '../../src/components/TaskForms';
import TaskCalendar from '../../src/components/TaskCalendar/TaskCalendar';
import { useLoginContext } from '../../src/components/LoginContext'; // Import useLoginContext
import Box from '@mui/material/Box'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './TaskSchedulerPage.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variables

const TaskSchedulerPage = () => {
    const { mode } = useThemeContext();
    const { userId, loggedIn } = useLoginContext(); // Get userId and loggedIn from context
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTask, setEditingTask] = useState('');
    const [editingDueDate, setEditingDueDate] = useState('');
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate(); // Hook to navigate to another route

    useEffect(() => {
        if (!loggedIn) {
            navigate('/'); // Navigate to the landing page if not logged in
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        // Load tasks from localStorage if available
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }

        // Fetch tasks from backend when userId changes
        const fetchTasks = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`${BACKEND_URL}/api/task/task-scheduler`, {
                        params: { userId } // Pass userId as query parameter
                    });
                    const fetchedTasks = response.data.map(task => ({
                        ...task,
                        dueDate: new Date(task.dueDate)  // Convert string back to Date object
                    }));
                    setTasks(fetchedTasks);
                    localStorage.setItem('tasks', JSON.stringify(fetchedTasks)); // Save to localStorage
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            }
        };

        fetchTasks();
    }, [userId]); // Ensure tasks are fetched when userId changes

    const handleAddTask = async (description, dueDate) => {
        const task = { description, dueDate: new Date(dueDate), finished: false, userId };
        try {
            const response = await axios.post(`${BACKEND_URL}/api/task/task-scheduler`, task);
            const newTask = response.data;
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            setAddFormVisible(false);  // Hide the form after submission
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleEditTask = async (description, dueDate, userId) => {
        if (editingIndex !== null) {
            const taskToUpdate = tasks[editingIndex];
            const updatedTask = { ...taskToUpdate, description, dueDate: new Date(dueDate), userId };
            try {
                const response = await axios.put(`${BACKEND_URL}/api/task/task-scheduler/${taskToUpdate._id}`, updatedTask);
                const updatedTasks = tasks.map((task, index) =>
                    index === editingIndex ? response.data : task
                );
                setTasks(updatedTasks);
                setEditingIndex(null);
                setEditingTask('');
                setEditingDueDate('');
            } catch (error) {
                console.error('Error editing task:', error);
            }
        }
        setEditFormVisible(false);  // Hide the form after submission
    };

    const handleDeleteTask = async (index) => {
        const taskToDelete = tasks[index];
        try {
            await axios.delete(`${BACKEND_URL}/api/task/task-scheduler/${taskToDelete._id}`);
            const updatedTasks = tasks.filter((task, i) => i !== index);
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save to localStorage
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleDateClick = (date) => {
        if (isAddFormVisible) {
            // If the add form is already visible, hide it on double-click
            setAddFormVisible(false);
        } else {
            // Otherwise, show the add form and set the selected date
            setSelectedDate(date.dateStr);  
            setEditingDueDate(date.dateStr);
            setEditFormVisible(false);  // Ensure the edit form is closed
            setAddFormVisible(true);  // Show the form when a date is clicked
        }
    };

    const handleEventClick = (info) => {
        const taskIndex = tasks.findIndex(task => 
            task.description === info.event.title &&
            new Date(task.dueDate).toISOString() === info.event.start.toISOString()
        );
    
        if (taskIndex !== -1) {
            if (editingIndex === taskIndex && isEditFormVisible) {
                setEditFormVisible(false);  // Hide the form if the same event is clicked again
            } else {
                setEditingIndex(taskIndex);
                setEditingTask(tasks[taskIndex].description);
                const dueDate = new Date(tasks[taskIndex].dueDate);
                setEditingDueDate(dueDate.toISOString().slice(0, 16)); // Format for input
                setAddFormVisible(false);  // Hide the add form if it's open
                setEditFormVisible(true);  // Show the edit form
            }
        }
    };

    const handleEventDoubleClick = (info) => {
        setEditFormVisible(false);  // Hide the form on double click
    };

    const handleEventDrop = (info) => {
        const updatedTasks = tasks.map(task => {
            if (task.description === info.event.title) {
                return { ...task, dueDate: info.event.start }; // Update the due date
            }
            return task;
        });
        
        setTasks(updatedTasks); // Update state
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
    };

    return (
        <Box className={`task-scheduler-container ${mode}`}>
            <Box className="task-scheduler-box"> {/* NOTE FOR ME : the big box */} 
                <h1>Task Scheduler</h1>
                {isAddFormVisible && (
                    <AddTaskForm
                        onSubmit={handleAddTask}
                        onClose={() => setAddFormVisible(false)}
                        selectedDate={selectedDate}  // Pass the selected date
                    />
                )}
                {isEditFormVisible && (
                    <EditTaskForm
                        onSubmit={handleEditTask}
                        editingTask={editingTask}
                        editingDueDate={editingDueDate || selectedDate}
                        setEditingTask={setEditingTask}
                        setEditingDueDate={setEditingDueDate}
                        onDelete={() => handleDeleteTask(editingIndex)}
                        onClose={() => setEditFormVisible(false)}
                    />
                )}
                <TaskCalendar
                    tasks={tasks} // Pass the tasks to the TaskCalendar component
                    handleDateClick={handleDateClick}  // Pass the date click handler
                    handleEventClick={handleEventClick}  // Pass the event click handler
                    handleEventDoubleClick={handleEventDoubleClick}  // Pass the event double click handler
                    onEventDrop={handleEventDrop} // Pass the event drop handler
                    mode={mode}
                />
            </Box>
        </Box>
    );
};

export default TaskSchedulerPage;
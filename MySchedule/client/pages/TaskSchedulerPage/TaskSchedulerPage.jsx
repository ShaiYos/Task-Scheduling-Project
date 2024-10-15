import React, { useState } from 'react';
import { useThemeContext } from '../../src/components/ThemeContext'; // Import the ThemeContext
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TaskSchedulerPage.css';

// Main component for the task scheduler page
const TaskSchedulerPage = () => {
    const { mode } = useThemeContext(); // Accessing the theme (dark/light) from ThemeContext
    const localizer = momentLocalizer(moment); // Initializing the localizer to handle date formatting with moment.js
    const [tasks, setTasks] = useState([]); // Array of tasks
    const [newTask, setNewTask] = useState(''); // Input for new task
    const [dueDate, setDueDate] = useState(''); // Due date for new task
    const [editingIndex, setEditingIndex] = useState(null); // Index of task being edited
    const [editingTask, setEditingTask] = useState(''); // Edited task title
    const [editingDueDate, setEditingDueDate] = useState(''); // Edited due date

    // Handler to add a new task
    const handleAddTask = (e) => {
        e.preventDefault(); // Prevent page refresh on form submit
        // Create a new task object with title, due date, and finished status
        const task = { title: newTask, dueDate: new Date(dueDate), finished: false };
        setTasks([...tasks, task]);  // Add new task to the tasks array
        // Clear input fields
        setNewTask('');
        setDueDate('');
    };
    // Handler to delete a task based on its index
    const handleDeleteTask = (index) => {
        // Remove task at the specified index from tasks array
        setTasks(tasks.filter((task, i) => i !== index));
    };
    // Handler to start editing a task
    const handleEditTask = (index) => {
        setEditingIndex(index); // Set the index of the task being edited
        setEditingTask(tasks[index].title); // Set task title for editing
        // Set task due date for editing (convert date to ISO string format)
        setEditingDueDate(tasks[index].dueDate.toISOString().slice(0, 16));
    };
    // Handler to save the edited task
    const handleSaveEdit = (e) => {
        e.preventDefault();
        // Update the task at the editingIndex with new title and due date
        const updatedTasks = tasks.map((task, index) =>
            index === editingIndex ? { ...task, title: editingTask, dueDate: new Date(editingDueDate) } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null); // Reset editing state
        setEditingTask('');
        setEditingDueDate('');
    };
    // Handler to mark a task as finished (removes the task)
    const handleMarkAsFinished = (index) => {
        // Remove the task when marked as finished
        setTasks(tasks.filter((task, i) => i !== index));
    };

    // Get today's date in ISO format to set the minimum date for the task due date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className={`container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`} >
            <h1>Weekly Task Scheduler</h1>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`task-item ${task.finished ? 'finished' : ''}`}>
                        <span>{task.title}</span>
                        <span>{task.dueDate.toLocaleString()}</span>
                        <button onClick={() => handleMarkAsFinished(index)}>
                            {task.finished ? '✔' : 'Mark as Finished'}
                        </button>
                        <button onClick={() => handleEditTask(index)}>Edit</button>
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editingIndex !== null ? (
                <form onSubmit={handleSaveEdit}>
                    <input
                        type="text"
                        value={editingTask}
                        onChange={(e) => setEditingTask(e.target.value)}
                        placeholder="Edit Task"
                    />
                    <input
                        type="datetime-local"
                        value={editingDueDate}
                        onChange={(e) => setEditingDueDate(e.target.value)}
                        min={today}
                    />
                    <button type="submit">Save</button>
                </form>
            ) : (
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="New Task"
                    />
                    <input
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={today}
                    />
                    <button className='addTaskButton' type="submit">Add Task</button>
                </form>
            )}
            <Calendar
                localizer={localizer}
                events={tasks.map(task => ({
                    title: task.title,
                    start: new Date(task.dueDate),
                    end: new Date(task.dueDate),
                }))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700, width: '100%' }}
                className={mode === 'dark' ? 'dark-mode' : 'light-mode'}
            />
        </div>
    );
};

export default TaskSchedulerPage;
import React, { useState } from 'react';
import { useThemeContext } from '../../src/components/ThemeContext'; // Import the ThemeContext
import TaskForm from '../../src/components/TaskForm';
import TaskCalendar from '../../src/components/TaskCalendar';
import './TaskSchedulerPage.css';

// Main component for the task scheduler page
const TaskSchedulerPage = () => {
    const { mode } = useThemeContext(); // Accessing the theme (dark/light) from ThemeContext
    const [tasks, setTasks] = useState([]); // Array of tasks
    const [editingIndex, setEditingIndex] = useState(null); // Index of task being edited
    const [editingTask, setEditingTask] = useState(''); // Edited task title
    const [editingDueDate, setEditingDueDate] = useState(''); // Edited due date

    // Handler to add or edit a task
    const handleAddOrEditTask = (title, dueDate) => {
        if (editingIndex !== null) {
            // Update the task at the editingIndex with new title and due date
            const updatedTasks = tasks.map((task, index) =>
                index === editingIndex ? { ...task, title, dueDate: new Date(dueDate) } : task
            );
            setTasks(updatedTasks);
            setEditingIndex(null); // Reset editing state
            setEditingTask('');
            setEditingDueDate('');
        } else {
            // Create a new task object with title, due date, and finished status
            const task = { title, dueDate: new Date(dueDate), finished: false };
            setTasks([...tasks, task]);  // Add new task to the tasks array
        }
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

    // Handler to mark a task as finished (removes the task)
    const handleMarkAsFinished = (index) => {
        // Remove the task when marked as finished
        setTasks(tasks.filter((task, i) => i !== index));
    };

    return (
        <div className={`container ${mode}`}>
            <div className="task-scheduler-box">
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
                <TaskForm
                    onSubmit={handleAddOrEditTask}
                    editingIndex={editingIndex}
                    editingTask={editingTask}
                    editingDueDate={editingDueDate}
                    setEditingTask={setEditingTask}
                    setEditingDueDate={setEditingDueDate}
                    setEditingIndex={setEditingIndex}
                />
                <TaskCalendar tasks={tasks} mode={mode} />
            </div>
        </div>
    );
};

export default TaskSchedulerPage;
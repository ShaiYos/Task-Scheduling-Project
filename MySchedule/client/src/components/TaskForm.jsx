import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar'; // Import Calendar component from PrimeReact
// import './TaskForm.css'; // Add your styles for the form

const TaskForm = ({ onSubmit, editingIndex, editingTask, editingDueDate, setEditingTask, setEditingDueDate }) => {
    const [datetime24h, setDateTime24h] = useState(editingDueDate ? new Date(editingDueDate) : null); // State for the date-time picker

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editingTask || !datetime24h) {
            alert('Please provide both task title and due date!');
            return;
        }
        onSubmit(editingTask, datetime24h);  // Submit the task with title and selected date
        setEditingTask('');
        setDateTime24h(null); // Reset form after submission
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div>
                <label>Task Title</label>
                <input
                    type="text"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                    placeholder="Enter task title"
                />
            </div>
            <div>
                <label>Due Date</label>
                <Calendar
                    value={datetime24h}
                    onChange={(e) => setDateTime24h(e.value)} // Set the selected date and time
                    showTime
                    hourFormat="24" // Ensure 24-hour format
                />
            </div>
            <button type="submit">{editingIndex !== null ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;

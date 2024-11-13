// AddTaskForm.js
import React, { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';

const AddTaskForm = ({ onSubmit }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskDueDate = new Date(dueDate);
        taskDueDate.setHours(dueTime.split(':')[0], dueTime.split(':')[1]);

        const newTask = {
            description,
            dueDate: taskDueDate.toISOString(),
            userId: localStorage.getItem('userId'),
        };

        onSubmit(newTask);
    };

    return (
        <form onSubmit={handleSubmit} id="add-task-form">
            <Box>
                <TextField
                    sx={{ marginBottom: 4 }}
                    label="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    sx={{ marginBottom: 4 }}
                    type="date"
                    label="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    sx={{ marginBottom: 4 }}
                    type="time"
                    label="Due Time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    fullWidth
                    required
                />
            </Box>
        </form>
    );
};

export default AddTaskForm;

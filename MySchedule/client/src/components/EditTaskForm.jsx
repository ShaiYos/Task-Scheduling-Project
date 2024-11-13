// EditTaskForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EditTaskForm = ({ event, onSubmit }) => {
    const [description, setDescription] = useState(event.description || '');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');

    useEffect(() => {
        if (event) {
            setDescription(event.description || '');
            const start = new Date(event.dueDate);
            setDueDate(start.toISOString().split('T')[0]);
            setDueTime(start.toTimeString().split(':').slice(0, 2).join(':'));
        }
    }, [event]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDueDate = new Date(dueDate);
        updatedDueDate.setHours(dueTime.split(':')[0], dueTime.split(':')[1]);

        const updatedTask = {
            ...event,
            description,
            dueDate: updatedDueDate.toISOString(),
        };

        onSubmit(updatedTask);
    };

    return (
        <form onSubmit={handleSubmit} id="edit-task-form">
            <Box>
                <TextField
                    label="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    type="date"
                    label="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    type="time"
                    label="Due Time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
            </Box>
        </form>
    );
};

export default EditTaskForm;

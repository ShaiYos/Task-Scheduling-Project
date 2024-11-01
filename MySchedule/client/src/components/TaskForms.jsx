import React, { useState, useEffect } from 'react';
import { useLoginContext } from './LoginContext'; // Import useLoginContext
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const AddTaskForm = ({ onSubmit, onClose, selectedDate }) => {
    const [task, setTask] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [minTime, setMinTime] = useState('00:00');
    const [maxTime, setMaxTime] = useState('23:59');
    const { userId } = useLoginContext(); // Get userId from context

    useEffect(() => {
        if (selectedDate) {
            const dateObj = new Date(selectedDate); // Ensure selectedDate is a Date object
            const now = new Date();
            setDate(dateObj.toISOString().split('T')[0]);
            if (dateObj.toDateString() === now.toDateString()) {
                const currentTime = now.toTimeString().slice(0, 5);
                setMinTime(currentTime);
            } else {
                setMinTime('00:00');
            }
        }
    }, [selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task || !time) {
            alert('Please provide both task description and time!');
            return;
        }
        const dueDate = `${date}T${time}`;
        onSubmit(task, dueDate, userId);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="add-task-form" maxWidth="400px" mx="auto">
            <Box mb={2}>
                <TextField
                    label="Task Description"
                    variant="outlined"
                    fullWidth
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter Task description"
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Time"
                    type="time"
                    variant="outlined"
                    fullWidth
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: minTime,
                        max: maxTime,
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="space-between" mb='20px'>
                <Button variant="contained" color="primary" type="submit">
                    Add Task
                </Button>
                <Button variant="contained" color="secondary" type="button" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

const EditTaskForm = ({ onSubmit, editingTask, editingDueDate, setEditingTask, setEditingDueDate, onClose, onDelete }) => {
    const [time, setTime] = useState(editingDueDate ? editingDueDate.split('T')[1] : '');
    const [date, setDate] = useState('');
    const [minTime, setMinTime] = useState('00:00');
    const { userId } = useLoginContext(); // Get userId from context

    useEffect(() => {
        if (editingDueDate) {
            const dateObj = new Date(editingDueDate); // Ensure editingDueDate is a Date object
            setTime(dateObj.toTimeString().slice(0, 5));
            setDate(dateObj.toISOString().split('T')[0]);
            const now = new Date();
            if (dateObj.toDateString() === now.toDateString()) {
                const currentTime = now.toTimeString().slice(0, 5);
                setMinTime(currentTime);
            } else {
                setMinTime('00:00');
            }
        }
    }, [editingDueDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editingTask || !time) {
            alert('Please provide both task title and time!');
            return;
        }
        const [hours, minutes] = time.split(':');
        const dueTime = new Date(editingDueDate);
        dueTime.setHours(hours, minutes);
        onSubmit(editingTask, dueTime, userId); // Pass userId to onSubmit
        setEditingTask('');
        setEditingDueDate('');
        setTime('');
    };

    const handleDelete = async () => {
        try {
            await onDelete(); // Remove the task from the database
            setEditingTask(''); // Clear the task description
            setEditingDueDate(''); // Clear the due date
            setTime(''); // Clear the time
        } catch (error) {
            console.error('Failed to delete the task:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="edit-task-form" maxWidth="400px" mx="auto">
            <Box mb={2}>
                <TextField
                    label="Task Description"
                    variant="outlined"
                    fullWidth
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                    placeholder="Enter Task description"
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Time"
                    type="time"
                    variant="outlined"
                    fullWidth
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="space-between" mb='20px'>
                <Button variant="contained" color="primary" type="submit">
                    Update Task
                </Button>
                <Button variant="contained" color="error" type="button" onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant="contained" color="secondary" type="button" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export { AddTaskForm, EditTaskForm };
import React, { useState, useEffect } from 'react';

const AddTaskForm = ({ onSubmit, onClose, selectedDate }) => {
    const [task, setTask] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [minTime, setMinTime] = useState('00:00');
    const [maxTime, setMaxTime] = useState('23:59');

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
            alert('Please provide both task title and time!');
            return;
        }
        const [hours, minutes] = time.split(':');
        const dueTime = new Date(selectedDate);
        dueTime.setHours(hours, minutes);
        onSubmit(task, dueTime);
        setTask('');
        setTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div>
                <label>Event Description</label>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter event description"
                />
            </div>
            {/* Removed Date input */}
            <div>
                <label>Time</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    min={minTime}
                    max={maxTime}
                />
            </div>
            <button type="submit">Add Event</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

const EditTaskForm = ({ onSubmit, editingTask, setEditingTask, editingDueDate, setEditingDueDate, onClose }) => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [minTime, setMinTime] = useState('00:00');
    const [maxTime, setMaxTime] = useState('23:59');

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
        onSubmit(editingTask, dueTime);
        setEditingTask('');
        setEditingDueDate('');
        setTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div>
                <label>Event Description</label>
                <input
                    type="text"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                    placeholder="Enter event description"
                />
            </div>
            {/* Removed Date input */}
            <div>
                <label>Time</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    min={minTime}
                    max={maxTime}
                />
            </div>
            <button type="submit">Update Event</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export { AddTaskForm, EditTaskForm };

import React, { useState } from 'react';

const TaskForm = ({ onSubmit, editingTask, setEditingTask, onClose }) => {
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editingTask || !time) {
            alert('Please provide both task title and time!');
            return;
        }
        const [hours, minutes] = time.split(':');
        const dueTime = new Date();
        dueTime.setHours(hours, minutes);
        onSubmit(editingTask, dueTime);
        setEditingTask('');
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
            <div>
                <label>Time</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <button type="submit">Add / Update Event</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default TaskForm;

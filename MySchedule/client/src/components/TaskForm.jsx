import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingIndex, editingTask, editingDueDate, setEditingTask, setEditingDueDate, setEditingIndex }) => {
    const [newTask, setNewTask] = useState(editingTask || '');
    const [dueDate, setDueDate] = useState(editingDueDate || '');

    useEffect(() => {
        setNewTask(editingTask);
        setDueDate(editingDueDate);
    }, [editingTask, editingDueDate]);

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newTask, dueDate);
        setNewTask('');
        setDueDate('');
        setEditingIndex(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={editingIndex !== null ? "Edit Task" : "New Task"}
            />
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={today}
            />
            <button type="submit">{editingIndex !== null ? "Save" : "Add Task"}</button>
        </form>
    );
};

export default TaskForm;
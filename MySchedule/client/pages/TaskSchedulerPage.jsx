import React, { useState, useContext } from 'react';
import { useThemeContext } from '../src/components/ThemeContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TaskSchedulerPage.css';

const TaskSchedulerPage = () => {
    const { mode, toggleTheme } = useThemeContext();
    const localizer = momentLocalizer(moment);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTask, setEditingTask] = useState('');
    const [editingDueDate, setEditingDueDate] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        const task = { title: newTask, dueDate: new Date(dueDate), finished: false };
        setTasks([...tasks, task]);
        setNewTask('');
        setDueDate('');
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((task, i) => i !== index));
    };

    const handleEditTask = (index) => {
        setEditingIndex(index);
        setEditingTask(tasks[index].title);
        setEditingDueDate(tasks[index].dueDate.toISOString().slice(0, 16));
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const updatedTasks = tasks.map((task, index) => 
            index === editingIndex ? { ...task, title: editingTask, dueDate: new Date(editingDueDate) } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditingTask('');
        setEditingDueDate('');
    };

    const handleMarkAsFinished = (index) => {
        setTasks(tasks.filter((task, i) => i !== index));
    };

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
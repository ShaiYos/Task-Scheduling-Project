import React, { useState, useRef } from 'react';
import { useThemeContext } from '../../src/components/ThemeContext';
import TaskForm from '../../src/components/TaskForm';
import TaskCalendar from '../../src/components/TaskCalendar';
import './TaskSchedulerPage.css';

const TaskSchedulerPage = () => {
    const { mode } = useThemeContext();
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTask, setEditingTask] = useState('');
    const [editingDueDate, setEditingDueDate] = useState('');
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleAddOrEditTask = (title, dueDate) => {
        if (editingIndex !== null) {
            const updatedTasks = tasks.map((task, index) =>
                index === editingIndex ? { ...task, title, dueDate: new Date(dueDate) } : task
            );
            setTasks(updatedTasks);
            setEditingIndex(null);
            setEditingTask('');
            setEditingDueDate('');
        } else {
            const task = { title, dueDate: new Date(dueDate), finished: false };
            setTasks([...tasks, task]);
        }
        setFormVisible(false);  // Hide the form after submission
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((task, i) => i !== index));
    };

    const handleEditTask = (index) => {
        setEditingIndex(index);
        setEditingTask(tasks[index].title);
        setEditingDueDate(tasks[index].dueDate.toISOString().slice(0, 16));
        setFormVisible(true);  // Show the form when editing
    };

    const handleMarkAsFinished = (index) => {
        setTasks(tasks.filter((task, i) => i !== index));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date.dateStr);  // Update to selected date
        setFormVisible(true);  // Show the form when a date is clicked
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
                {isFormVisible && (
                    <TaskForm
                        onSubmit={handleAddOrEditTask}
                        editingIndex={editingIndex}
                        editingTask={editingTask}
                        editingDueDate={editingDueDate || selectedDate}
                        setEditingTask={setEditingTask}
                        setEditingDueDate={setEditingDueDate}
                        setEditingIndex={setEditingIndex}
                    />
                )}
                <TaskCalendar
                    tasks={tasks}
                    handleDateClick={handleDateClick}  // Pass the date click handler
                    mode={mode}
                />
            </div>
        </div>
    );
};

export default TaskSchedulerPage;

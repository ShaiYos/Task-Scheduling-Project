import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../../src/components/ThemeContext';
import { AddTaskForm, EditTaskForm } from '../../src/components/TaskForm';
import TaskCalendar from '../../src/components/TaskCalendar';
import './TaskSchedulerPage.css';

const TaskSchedulerPage = () => {
    const { mode } = useThemeContext();
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTask, setEditingTask] = useState('');
    const [editingDueDate, setEditingDueDate] = useState('');
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        console.log("Retrieved tasks from localStorage:", savedTasks); // Debugging line
        if (savedTasks) {
            const parsedTasks = savedTasks.map(task => ({
                ...task,
                dueDate: new Date(task.dueDate)  // Convert string back to Date object
            }));
            setTasks(parsedTasks);
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }, [tasks]);

    const handleAddTask = (title, dueDate) => {
        const task = { title, dueDate: new Date(dueDate), finished: false };
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save to localStorage
        setAddFormVisible(false);  // Hide the form after submission
    };

    const handleEditTask = (title, dueDate) => {
        if (editingIndex !== null) {
            const updatedTasks = tasks.map((task, index) =>
                index === editingIndex ? { ...task, title, dueDate: new Date(dueDate) } : task
            );
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save to localStorage
            setEditingIndex(null);
            setEditingTask('');
            setEditingDueDate('');
        }
        setEditFormVisible(false);  // Hide the form after submission
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save to localStorage
    };

    const handleEditTaskClick = (index) => {
        setEditingIndex(index);
        setEditingTask(tasks[index].title);
        const dueDate = new Date(tasks[index].dueDate);
        dueDate.setHours(dueDate.getHours() + 2);  // Adjust the hours
        setEditingDueDate(dueDate.toISOString().slice(0, 16));
        setAddFormVisible(false);  // Ensure the add form is closed
        setEditFormVisible(true);  // Show the form when editing
    };

    const handleMarkAsFinished = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, finished: !task.finished } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save to localStorage
    };

    const handleDateClick = (date) => {
        if (isAddFormVisible) {
            // If the add form is already visible, hide it on double-click
            setAddFormVisible(false);
        } else {
            // Otherwise, show the add form and set the selected date
            setSelectedDate(date.dateStr);  
            setEditingDueDate(date.dateStr);
            setEditFormVisible(false);  // Ensure the edit form is closed
            setAddFormVisible(true);  // Show the form when a date is clicked
        }
    };
    

    const handleEventClick = (info) => {
        const taskIndex = tasks.findIndex(task => 
            task.title === info.event.title &&
            new Date(task.dueDate).toISOString() === info.event.start.toISOString()
        );
    
        if (taskIndex !== -1) {
            if (editingIndex === taskIndex && isEditFormVisible) {
                setEditFormVisible(false);  // Hide the form if the same event is clicked again
            } else {
                setEditingIndex(taskIndex);
                setEditingTask(tasks[taskIndex].title);
                const dueDate = new Date(tasks[taskIndex].dueDate);
                dueDate.setHours(dueDate.getHours() + 3); // Adjust if necessary
                setEditingDueDate(dueDate.toISOString().slice(0, 16)); // Format for input
                setAddFormVisible(false);  // Hide the add form if it's open
                setEditFormVisible(true);  // Show the edit form
            }
        }
    };
    
    

    const handleEventDoubleClick = (info) => {
        setEditFormVisible(false);  // Hide the form on double click
    };

    const handleEventDrop = (info) => {
        const updatedTasks = tasks.map(task => {
            if (task.title === info.event.title) {
                return { ...task, dueDate: info.event.start }; // Update the due date
            }
            return task;
        });
        
        setTasks(updatedTasks); // Update state
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
    };
    
    return (
        <div className={`container ${mode}`}>
            <div className="task-scheduler-box">
                <h1>Weekly Task Scheduler</h1>
                {isAddFormVisible && (
                    <AddTaskForm
                        onSubmit={handleAddTask}
                        onClose={() => setAddFormVisible(false)}
                        selectedDate={selectedDate}  // Pass the selected date
                    />
                )}
                {isEditFormVisible && (
                    <EditTaskForm
                        onSubmit={handleEditTask}
                        editingTask={editingTask}
                        editingDueDate={editingDueDate || selectedDate}
                        setEditingTask={setEditingTask}
                        setEditingDueDate={setEditingDueDate}
                        onClose={() => setEditFormVisible(false)}
                    />
                )}
                <TaskCalendar
                    tasks={tasks}
                    handleDateClick={handleDateClick}  // Pass the date click handler
                    handleEventClick={handleEventClick}  // Pass the event click handler
                    handleEventDoubleClick={handleEventDoubleClick}  // Pass the event double click handler
                    onEventDrop={handleEventDrop} // Pass the event drop handler
                    mode={mode}
                />
            </div>
        </div>
    );
};

export default TaskSchedulerPage;
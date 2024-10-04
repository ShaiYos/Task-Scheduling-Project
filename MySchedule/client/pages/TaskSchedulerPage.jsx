import React, { useState, useContext } from 'react';
import { useThemeContext } from '../src/components/ThemeContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';


export default function TaskSchedulerPage() {
    const { mode, toggleTheme } = useThemeContext();
    const localizer = momentLocalizer(moment);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [dueDate, setDueDate] = useState('');
  
    const handleAddTask = (e) => {
      e.preventDefault();
      const task = { title: newTask, dueDate: dueDate };
      setTasks([...tasks, task]);
      setNewTask('');
      setDueDate('');
    };
  
    const handleDeleteTask = (index) => {
      setTasks(tasks.filter((task, i) => i !== index));
    };
  
    return (
      <div>
        <h1>Weekly Task Scheduler</h1>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>
                  {task.dueDate === "Monday" ? <span>Due</span> : ""}
                </td>
                <td>
                  {task.dueDate === "Tuesday" ? <span>Due</span> : ""}
                </td>
                <td>
                  {task.dueDate === "Wednesday" ? <span>Due</span> : ""}
                </td>
                <td>
                  {task.dueDate === "Thursday" ? <span>Due</span> : ""}
                </td>
                <td>
                  {task.dueDate === "Friday" ? <span>Due</span> : ""}
                </td>
                <td>
                  {task.dueDate === "Saturday" ? <span>Due</span> : ""}
                </td>
                <td>
                  {task.dueDate === "Sunday" ? <span>Due</span> : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
          />
          <select
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <button onClick={handleAddTask}>Add Task</button>
        </form>
      </div>
    );
}
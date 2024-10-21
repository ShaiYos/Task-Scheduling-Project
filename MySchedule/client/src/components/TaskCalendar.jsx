import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const TaskCalendar = ({ tasks, mode }) => {
    const localizer = momentLocalizer(moment);

    return (
        <BigCalendar
            localizer={localizer}
            events={tasks.map(task => ({
                title: task.title,
                start: new Date(task.dueDate),
                end: new Date(task.dueDate),
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700, width: '100%' }}
            className={mode}
        />
    );
};

export default TaskCalendar;
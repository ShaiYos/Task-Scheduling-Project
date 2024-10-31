import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const TaskCalendar = ({ tasks, handleDateClick, handleEventClick, handleEventDoubleClick, mode, onEventDrop }) => {
    const calendarRef = useRef(null);

    return (
        <div className={`calendar-container ${mode}`}>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventDrop={onEventDrop} // Add the eventDrop handler here
                eventDoubleClick={handleEventDoubleClick}
                events={tasks.map(task => ({
                    title: task.title,
                    start: new Date(task.dueDate),
                    end: new Date(task.dueDate),
                }))}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                editable={true}
                eventStartEditable={true}
                eventResizableFromStart={true}
                height={'600px'}
                className={mode}
            />
        </div>
    );
};

export default TaskCalendar;

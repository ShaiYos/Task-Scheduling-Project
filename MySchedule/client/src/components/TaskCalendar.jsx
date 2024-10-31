import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useLoginContext } from './LoginContext'; // Import useLoginContext

const TaskCalendar = ({ tasks, handleDateClick, handleEventClick, handleEventDoubleClick, mode, onEventDrop }) => {
    const calendarRef = useRef(null);
    const { userId } = useLoginContext(); // Get userId from context

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
                events={tasks
                    .filter(task => task.userId === userId) // Filter tasks by userId
                    .map(task => ({
                        title: task.description,
                        start: new Date(task.dueDate),
                        end: new Date(task.dueDate),
                    }))
                }
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

import React, { useRef , useState  } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const TaskCalendar = ({ tasks, mode }) => {
    const calendarRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (info) => {
        // When a day is clicked, change the view to 'timeGridDay'
        let calendarApi = calendarRef.current.getApi();
        calendarApi.changeView('timeGridDay', info.dateStr);
    };

    const handleSelect = (selectInfo) => {
        const title = prompt('Enter Event Title:'); // Prompt for event title
        if (title) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent({
                title,
                start: selectInfo.startStr, // Start time of the selection
                end: selectInfo.endStr,     // End time of the selection
                allDay: selectInfo.allDay,  // Handles all-day events
            });
            calendarApi.unselect();  // Unselect the date/time range
        }
    };

    return (
        <div className={`calendar-container ${mode}`}>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}  // Enable date and time selection
                select={handleSelect}  // Handle date/time selection
                dateClick={handleDateClick}  // Handle day clicks to change view
                events={tasks.map(task => ({
                    title: task.title,
                    start: new Date(task.dueDate),
                    end: new Date(task.dueDate),
                }))}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                editable={true}  // Allow events to be draggable and resizable
                eventStartEditable={true}
                eventResizableFromStart={true}
                height={'600px'}
                className={mode} // Apply theme-specific class
            />
        </div>
    );
};

export default TaskCalendar;
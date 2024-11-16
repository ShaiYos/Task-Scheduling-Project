import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useLoginContext } from '../LoginContext'; // Import useLoginContext
import Box from '@mui/material/Box'; // Import Box from Material-UI

// import './CustomCalendar.css';

const CustomCalendar = ({ tasks, handleDateClick, handleEventClick, mode, onEventDrop }) => {
    const calendarRef = useRef(null);
    const { userId } = useLoginContext(); // Get userId from context
    const filteredTasks = Array.isArray(tasks) ? tasks.filter(task => task.dueDate) : [];

    return (
        <Box className={`calendar-container ${mode}`}
            sx={{
                height: '85vh',         // Adjust to fit most of the screen height
                width: '95vw',          // Adjust to fit most of the screen width
                maxWidth: '100vw',      // Cap at full viewport width
                maxHeight: '100vh',     // Cap at full viewport height
                margin: '0 auto',       // Center horizontally
                overflow: 'auto',       // Add scrolling if needed
                boxSizing: 'border-box', // Prevent overflow from padding/border
                padding: 2,             // Optional padding for spacing
            }}
        >
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventDrop={onEventDrop}
                timeZone="Asia/Jerusalem"
                events={filteredTasks
                    .filter(task => task.userId === userId)
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
                editable
                eventStartEditable
                eventResizableFromStart
                height="100%" // Full height of the container
            />
        </Box>
    );
};

export default CustomCalendar;
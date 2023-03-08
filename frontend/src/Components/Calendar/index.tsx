// import { useCallback, useState, } from "react";
// import FullCalendar, { DateSelectArg, EventApi, EventClickArg, EventInput } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import allLocales from "@fullcalendar/core/locales-all";
// import interactionPlugin from "@fullcalendar/interaction";

// let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
// const createEventId = () => String(eventGuid++);
// const INITIAL_EVENTS: EventInput[] = [
//     {
//         id: createEventId(),
//         title: "All-day event",
//         start: todayStr
//     },
//     {
//         id: createEventId(),
//         title: "Timed event",
//         start: todayStr + "T12:00:00"
//     }
// ];

// const index = () => {
//     const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
//     const handleEvents = useCallback(
//         (events: EventApi[]) => setCurrentEvents(events),
//         []
//     );
//     const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
//         let title = prompt("Veuillez entrer le titre de l'événement")?.trim();
//         let calendarApi = selectInfo.view.calendar;
//         calendarApi.unselect();
//         if (title) {
//             calendarApi.addEvent({
//                 id: createEventId(),
//                 title,
//                 start: selectInfo.startStr,
//                 end: selectInfo.endStr,
//                 allDay: selectInfo.allDay
//             });
//         }
//     }, []);
//     const handleEventClick = useCallback((clickInfo: EventClickArg) => {
//         if (
//             window.confirm(`cet evènement "${clickInfo.event.title}" voulez-vous supprimer`)
//         ) {
//             clickInfo.event.remove();
//         }
//     }, []);
//     return (
//         <div className="demo-app">
//             <div className="demo-app-main">
//                 <FullCalendar
//                     plugins={[dayGridPlugin, interactionPlugin]}
//                     initialView="dayGridMonth"
//                     selectable={true}
//                     editable={true}
//                     initialEvents={INITIAL_EVENTS}
//                     locales={allLocales}
//                     locale="ja"
//                     eventsSet={handleEvents}
//                     select={handleDateSelect}
//                     eventClick={handleEventClick}
//                 />
//             </div>
//         </div>
//     );
// }

// export default index

import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    }
]

function createEventId() {
    return String(eventGuid++)
}
// const events =
//     [
//         { title: 'event 1', date: '2019-04-01' },
//         { title: 'event 2', date: '2019-04-02' }
//     ]
const Calendar = () => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={INITIAL_EVENTS}
            // aspectRatio={1}
            height={800}
        />
    )
}

export default Calendar
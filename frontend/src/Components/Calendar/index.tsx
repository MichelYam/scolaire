import React, { createRef } from 'react'
import { DateSelectArg, formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';
import { Event } from "../../Redux/features/event/eventSlice"
import moment from 'moment'
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
        title: 'testestesteste',
        start: "12h00"
    }
]

function createEventId() {
    return String(eventGuid++)
}
const events =
    [
        { title: 'event 1', date: '2019-04-01', },
        { title: 'event 2', date: '2019-04-02' }
    ]
type IProps = {
    events: Event[]
    height: string | number
    onSelect?: ((arg: DateSelectArg) => void) | undefined
}
const Calendar = ({ events, height, onSelect }: IProps) => {

    const calendarComponentRef = createRef<FullCalendar>();

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            aspectRatio={10}
            ref={calendarComponentRef}
            height={height}
            locale={frLocale}
            editable={true}
            select={onSelect}
            selectable={true}
            headerToolbar={{
                left: 'prev,today,next',
                center: 'prev,title,next',
                right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
        />
    )
}

export default Calendar
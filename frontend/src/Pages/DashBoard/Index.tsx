import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectEvent, selectRoom, selectTask, selectUser } from '../../utils/selector';
import { getUserDetails } from '../../Redux/features/user/userAction';
//Style
import './style.css'
import { getMyTasks } from '../../Redux/features/task/taskAction';
import { getMyEvents } from '../../Redux/features/event/eventAction';
import moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react';
import frLocale from '@fullcalendar/core/locales/fr';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
//components
const Index = () => {
    const dispatch = useAppDispatch()
    const { events } = useAppSelector(selectEvent)
    const { tasks } = useAppSelector(selectTask)

    useEffect(() => {
        dispatch(getMyTasks())
        dispatch(getMyEvents())
    }, [])
    return (
        <>
            {/* <h1>DashBoard Content</h1> */}
            <div className='dashboard'>
                <div className='dashboard-events'>
                    <div className='calendar-envent'>
                        <div className='flex align-items-center '>
                            <CalendarMonthOutlinedIcon />
                            <h2>Calendrier</h2>
                        </div>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            weekends={true}
                            events={events}
                            aspectRatio={10}
                            height={300}
                            locale={frLocale}
                            editable={true}
                            // select={handleChangeDateValue}
                            selectable={true}
                            headerToolbar={{
                                left: 'prev,today,next',
                                // center: 'title',
                                right: "title"
                            }}
                        />
                    </div>
                    <div className='dashboard-events-container'>
                        <h2>Prochains évènements</h2>
                        <div className='dashboard-events-list'>
                            {!events.length && <span>Vous n'avez pas d'évènements pour l'instant</span>}
                            {events.map((event, index) => (
                                <div key={index} className='card'>
                                    <div className='card-header'>
                                        <h2>Informatiques</h2>
                                        <div className='card-badge'>
                                            <span className='badge'>12h00</span>
                                            <span className='badge'>{moment(event.date).format("DD/MM/YYYY")}</span>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <p>{event.description}</p>
                                    </div>
                                    <div className="card-footer">
                                        <p>avec {event.createdBy}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='dashboard-todos'>
                    <div className='flex align-items-center '>
                        <ListAltOutlinedIcon />
                        <h2>Tâches</h2>
                    </div>
                    <div className='dashboard-todos-list'>
                        <h3>Tâche en cours</h3>
                        {!tasks.length && <span>Vous n'avez pas de devoir pour l'instant</span>}
                        {tasks.map((task, index) => (
                            <div key={index} className={`todo ${index % 2 === 0 ? "even" : ""}`}>
                                <p className='todo-description'>{task.description}</p>
                                <p>par {task.createdBy}</p>
                                <p>{moment(task.dateDue).format("DD/MM/YYYY")}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='dashboard-conversations'>
                    <div className='flex align-items-center '>
                        <ChatOutlinedIcon />
                        <h2>Messagerie</h2>
                    </div>

                </div>
            </div>

        </>
    )

}

export default Index
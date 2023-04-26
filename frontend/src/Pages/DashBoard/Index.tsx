import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectEvent, selectRoom, selectTask, selectUser } from '../../utils/selector';
import { getUserDetails } from '../../Redux/features/user/userAction';
//Style
import Calendar from '../../Components/Calendar';
import './style.css'
import { getMyTasks } from '../../Redux/features/task/taskAction';
import { getMyEvents } from '../../Redux/features/event/eventAction';
import moment from 'moment';

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
                        <h2>Calendrier</h2>
                        <Calendar height={300} events={events} />
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
                    <h2>Tâches</h2>
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
                    <h2>Messagerie</h2>

                </div>
            </div>

        </>
    )

}

export default Index
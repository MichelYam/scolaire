import React, { createRef, useEffect, useState } from 'react'
// import { eventMockData } from '../../data/eventsData'

import Calendar from '../../Components/Calendar'
import Can from '../../Components/Can'
import { Modal } from '../../Components/Modal'
import Form from '../../Components/Form'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { selectEvent, selectUser } from '../../utils/selector'
import { createEvent, getMyEvents } from '../../Redux/features/event/eventAction'

import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import { DateSelectArg, formatDate } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';
import './Style.css'
const Index = () => {
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(selectUser)
  const [isOpen, setIsOpen] = useState(false)

  const { events } = useAppSelector(selectEvent)
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    assignee: "",
    date: '',
    timetable: '',
  })
  const calendarComponentRef = createRef<FullCalendar>();

  useEffect(() => {
    dispatch(getMyEvents())
  }, [])


  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }
  const handleChangeDateValue = (date: any) => {
    setEventData({
      ...eventData,
      date: date.startStr,
    })
    setIsOpen(true)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newDate = moment(eventData.date + eventData.timetable, 'YYYY-MM-DDLT').toISOString();
    dispatch(createEvent({ ...eventData, date: newDate }))
    setIsOpen(false)
  }

  // const handleEventClick = (info: any) => {
  //   console.log(info.event._def)

  // }

  return (
    <>
      <div className='event'>
        <div className='event-container'>
          <div>
            <div className='flex justify-content-space-between align-items-center '>
              <h2> Évènements</h2>
              <Can I="create" a="Task">
                <div className='task-add' onClick={() => setIsOpen(true)}>
                  <i className='bx bx-plus'></i>
                </div>
              </Can>
            </div>
            <div className='event-list'>
              {!events.length && <span>Vous n'avez pas d'évènements pour l'instant</span>}
              {events.map((event, index) => (
                <div key={index} className='card'>
                  <div className='card-header'>
                    <h2>Informatiques</h2>
                    <div className='card-badge'>
                      <span className='badge'>{moment(event.date).format("HH:mm")}</span>
                      <span className='badge'>{moment(event.date).format('DD/MM/YYYY')}</span>
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
          <div className='event-calendar'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              // weekends={true}
              events={events}
              aspectRatio={10}
              ref={calendarComponentRef}
              height={800}
              // eventClick={(info) => handleEventClick(info)}
              locale={frLocale}
              editable={true}
              select={handleChangeDateValue}
              selectable={true}
              windowResize={(arg) => console.log(arg)}
              headerToolbar={{
                left: 'prev,today,next',
                center: 'title',
                right: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
            />
          </div>
        </div>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Créer un événement</h2>
        <form className='create' onSubmit={handleSubmit}>
          <div className='control-input'>
            <label htmlFor="title">Titre</label>
            <input type="text" id='title' onChange={handleChangeValue} />
          </div>
          <div className='control-input'>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols={20} rows={5} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setEventData({
                ...eventData,
                description: e.target.value
              })
            }} />
          </div>
          <div>
            <div className='control-input'>
              <label htmlFor="date">Date</label>
              <input type="date" id='date' value={eventData.date} onChange={handleChangeValue} />
            </div>
            <div className='control-input'>
              <label htmlFor="timetable">Horaire</label>
              <input type="time" id='timetable' value={eventData.timetable} onChange={handleChangeValue} />
            </div>
          </div>
          <div className='control-input'>
            <label htmlFor="assignee">Affectée à </label>
            <select name="assignee" id="assignee" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setEventData({
                ...eventData,
                assignee: e.target.value
              })
            }}>
              <option value="">Sélectionner un élève</option>
              {userInfo?.friendList.map((friend, index) => {
                const fullName = [friend.firstName, friend.lastName].join(" ")
                return <option key={index} value={friend.email}>{fullName}</option>
              })}
            </select>
          </div>
          <div className='group-btn'>
            <Button onClick={() => setIsOpen(false)} variant="contained">Annuler</Button>
            <Button type='submit' variant="contained">Créer</Button>
          </div>
        </form>
      </Modal >
    </>


  )
}

export default Index
import React, { useEffect, useState } from 'react'
// import { eventMockData } from '../../data/eventsData'
import './Style.css'

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
const Index = () => {
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(selectUser)
  const [isOpen, setIsOpen] = useState(false)

  const { events } = useAppSelector(selectEvent)
  const [eventData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "",
    dateDue: '',
  })

  useEffect(()=>{
    dispatch(getMyEvents())
  }, [])


  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }
  const handleChangeDateValue = (date: any) => {
    setTaskData({
      ...eventData,
      dateDue: date.startStr,
    })
    setIsOpen(true)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(eventData)
    dispatch(createEvent(eventData))
    setIsOpen(false)
  }
  return (
    <>
      <div className='event'>
        <div className='event-container'>
          <div>
            <div className='flex'>
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
                      <span className='badge'>12h00</span>
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
          <div className='calendar'>
            <Calendar height={800} onSelect={handleChangeDateValue} events={events} />
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
              setTaskData({
                ...eventData,
                description: e.target.value
              })
            }} />
          </div>
          <div className='control-input'>
            <label htmlFor="dateDue">Date</label>
            <input type="date" id='dateDue' value={eventData.dateDue} onChange={handleChangeValue} />
          </div>
          <div className='control-input'>
            <label htmlFor="assignee">Affectée à </label>
            <select name="assignee" id="assignee" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setTaskData({
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
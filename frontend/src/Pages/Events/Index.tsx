import React, { useState } from 'react'
// import { eventMockData } from '../../data/eventsData'
import './Style.css'

import Calendar from '../../Components/Calendar'
import Can from '../../Components/Can'
import { Modal } from '../../Components/Modal'
import Form from '../../Components/Form'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { selectEvent } from '../../utils/selector'
import { createEvent } from '../../Redux/features/event/eventAction'


// const example = [
//   {
//     title: "Découverte de la programmation",
//     description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
//     assignee: "Jean Charles",
//     createdBy: "Mr Dupont",
//     date: "12/12/2022",
//   },
//   {
//     title: "Découverte de la programmation",
//     description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
//     assignee: "Jean Charles",
//     createdBy: "Mr Dupont",
//     date: "12/12/2022",
//   },
//   {
//     title: "Découverte de la programmation",
//     description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
//     assignee: "Jean Charles",
//     createdBy: "Mr Dupont",
//     date: "12/12/2022",
//   },
//   {
//     title: "Découverte de la programmation",
//     description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
//     assignee: "Jean Charles",
//     createdBy: "Mr Dupont",
//     date: "12/12/2022",
//   },
//   {
//     title: "Découverte de la programmation",
//     description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
//     assignee: "Jean Charles",
//     createdBy: "Mr Dupont",
//     date: "12/12/2022",
//   },
//   {
//     title: "Découverte de la programmation",
//     description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
//     assignee: "Jean Charles",
//     createdBy: "Mr Dupont",
//     date: "12/12/2022",
//   },
// ]
const Index = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { events } = useAppSelector(selectEvent)
  const [eventData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "",
    dateDue: '',
  })

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createEvent(eventData))
    setIsOpen(false)
  }
  return (
    <>
      <div className='event'>
        <div className='event-container'>
          <div>
            <h2> évènements</h2>
            <Can I="create" a="Task">
              <div className='task-add' onClick={() => setIsOpen(true)}>
                <i className='bx bx-plus'></i>
              </div>
            </Can>
            <div className='event-list'>
            {!events.length && <span>Vous n'avez pas d'évènements pour l'instant</span>}
              {events.map((event, index) => (
                <div key={index} className='card'>
                  <div className='card-header'>
                    <h2>Informatiques</h2>
                    <div className='card-badge'>
                      <span className='badge'>12h00</span>
                      <span className='badge'>{event.date}</span>
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
            <Calendar />
          </div>
        </div>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Créer un tâche</h2>
        <form className='create' onSubmit={handleSubmit}>
          <div className='control-input'>
            <label htmlFor="title">Titre</label>
            <input type="text" id='title' onChange={handleChangeValue} />
          </div>
          <div className='control-input'>
            <label htmlFor="dateDue">Date</label>
            <input type="date" id='dateDue' onChange={handleChangeValue} />
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
          <div className='control-input-select'>
            <label htmlFor="assignee">Affectée à </label>
            <select name="assignee" id="assignee" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setTaskData({
                ...eventData,
                assignee: e.target.value
              })
            }}>
              <option value="">Sélectionner un élève</option>
              <option value="admin@admin.com">admin@admin.com</option>
              <option value="student@student.com">student@student.com</option>
              <option value="Charles">Charles Jean</option>
              <option value="Charles">Charles Jean</option>
              <option value="Charles">Charles Jean</option>
            </select>
          </div>
          <button type='submit'>Créer</button>
        </form>
      </Modal>
    </>


  )
}

export default Index
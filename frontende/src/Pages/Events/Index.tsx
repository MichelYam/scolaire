import React, { useState } from 'react'
// import { eventMockData } from '../../data/eventsData'
import './Style.css'
import { Modal } from '../../Components/Modal'
import Form from '../../Components/Form'


const example = [
  {
    title: "Découverte de la programmation",
    description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
    assignee: "Jean Charles",
    createdBy: "Mr Dupont",
    date: "12/12/2022",
  },
  {
    title: "Découverte de la programmation",
    description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
    assignee: "Jean Charles",
    createdBy: "Mr Dupont",
    date: "12/12/2022",
  },
  {
    title: "Découverte de la programmation",
    description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
    assignee: "Jean Charles",
    createdBy: "Mr Dupont",
    date: "12/12/2022",
  },
  {
    title: "Découverte de la programmation",
    description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
    assignee: "Jean Charles",
    createdBy: "Mr Dupont",
    date: "12/12/2022",
  },
  {
    title: "Découverte de la programmation",
    description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
    assignee: "Jean Charles",
    createdBy: "Mr Dupont",
    date: "12/12/2022",
  },
  {
    title: "Découverte de la programmation",
    description: "Lorem erezld azdjazdi odjlzadj zaidj lza",
    assignee: "Jean Charles",
    createdBy: "Mr Dupont",
    date: "12/12/2022",
  },
]
const Index = () => {

  return (
    <>
      <div> évènements</div>
      {example.map((item, index) => (
        <div key={index} className='event-card'>
          <div className='event-card-header'>
            <h2>Informatiques</h2>
            <div className='event-card-badge'>
              <span className='badge'>12h00</span>
              <span className='badge'>{item.date}</span>
            </div>
          </div>
          <div className='event-card-body'>
            <p>{item.description}</p>
          </div>
          <div className="event-card-footer">
            <p>avec {item.createdBy}</p>
          </div>
        </div>
      ))}
    </>


  )
}

export default Index
import React, { useEffect, useState } from 'react'
import { Modal } from '../../Components/Modal'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { createTask, deleteTask, getMyTasks } from "../../Redux/features/task/taskAction"
import { selectTask } from '../../utils/selector'

import "./style.css"
import Can from '../../Components/Can'
import { Task } from '../../Redux/features/task/taskSlice'

const Index = () => {
  const dispatch = useAppDispatch()
  const { tasks } = useAppSelector(selectTask)
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [openTaskView, setOpenTaskView] = useState(false)
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "",
    dateDue: '',
  })

  useEffect(() => {
    dispatch(getMyTasks())
  }, [tasks])

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...taskData,
      [event.target.id]: event.target.value,
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createTask(taskData))
    setIsOpen(false)
  }
  const deleteTaskByID = (_id: string) => {
    dispatch(deleteTask({ _id }))
  }
  const showTicket = (index: number, task: Task) => {
    let counter = 0
    if (counter === undefined || index !== index) counter = 0
    if (index === undefined || index !== index) index = index
    const container = document.getElementById("task-container") as HTMLInputElement
    if (counter % 2 === 0) {

      container.innerHTML = `
      <div className = 'task-container'>
        <div className='task-view-header'>
          <h2>${task.title}</h2>
          </div>
          <div className='task-view-body'>
          <div className='task-view-description'>
            <label htmlFor="description">Description</label>
            ${edit ? <textarea name="" id="" cols={30} rows={10}>${task.description}</textarea> : <p>${task.description}</p>}
          </div >
          <div className='task-view-assigne'>
            <div className='task-assigned'>
              <p>Assigné par :</p>
              <p>${task.createdBy}</p>
            </div>
            <p>Donné le :  <span>${task.createdBy}</span> </p>
          </div>
          <div className='task-view-date'>
            <p>Date limite: <span>${task.dateDue}</span> </p>
            <p>Statut: <span>${task.statut}0</span> </p>
          </div>
        </div >
      </div > `;
      counter++
    } else {
      counter++
      return container.innerHTML = ""
    }
    return container
  }
  return (
    <>
      <div className='section_task'>
        <div className='task-progress'>
          <h2>tâches en cours</h2>
          <div className='task-progress-container'>
            <div className='task-progress-search'>
              <input type="text" name="searchTask" id="searchTask" />
              <Can I="create" a="Task">
                <div className='task-add' onClick={() => setIsOpen(true)}>
                  <i className='bx bx-plus'></i>
                </div>
              </Can>
            </div>
            <div className='task-list'>
              {tasks.map((task, index) => (
                <div key={index} className='task' onClick={() => showTicket(index, task)}>
                  <div className='task-description'>
                    <p>{task.title}</p>
                    <span>{`par ${task.createdBy} `}</span>
                  </div>
                  <div className='task-date'>
                    <p>{task.dateDue}</p>
                    <span className='task-status'>{task.statut}</span>
                  </div>
                  <Can I="delete" a="Task">
                    <button onClick={() => deleteTaskByID(task._id)}>delete</button>
                  </Can>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='task-view'>
          {/* view task */}
          <h2>Tets</h2>
          <div className='task-container' id='task-container'>
            {/* <div className='task-view-header'>
              <h2>Mathématique</h2>
            </div>
            <div className='task-view-body'>
              <div className='task-view-description'>
                <label htmlFor="description">Description</label>
                <div>
                  <p>Faire 5 exercices de la page 255 de votre livre</p>
                </div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </div>
              <div className='task-view-assigne'>
                <div className='task-assigned'>
                  <p>Assigné par :</p>
                  <p>avatar KEKW</p>
                </div>
                <p>Donné le :  <span>en cours</span> </p>
              </div>
              <div className='task-view-date'>
                <p>Date limite: <span>22 février 2021 à 16h30</span> </p>
                <p>Statut: <span>22 février 2021 à 16h30</span> </p>
              </div>
            </div>*/}
          </div>
        </div>
        {/* task done */}
        <div className='task-done'>
          <h2>tâches terminées</h2>
          <div className='task-done-list'>
            {tasks.map((task, index) => (
              <div key={index} className='card'>
                <div className='card-header'>
                  <h2>Informatiques</h2>
                  <div className='card-badge'>
                    <span className='badge'>2023-01-27</span>
                    <span className='badge'>{task.statut}</span>
                  </div>
                </div>
                <div className='card-body'>
                  <p>{task.description}</p>
                </div>
                <div className='card-footer'>
                  <p>avec {task.createdBy}</p>
                </div>
              </div>
            ))}
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
                ...taskData,
                description: e.target.value
              })
            }} />
          </div>
          <div className='control-input-select'>
            <label htmlFor="assignee">Affectée à </label>
            <select name="assignee" id="assignee" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setTaskData({
                ...taskData,
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
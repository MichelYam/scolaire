import React, { useEffect, useState } from 'react'
import { Modal } from '../../Components/Modal'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { createTask, deleteTask, getMyTasks, getMyTasksAssignee } from "../../Redux/features/task/taskAction"
import { selectTask, selectUser } from '../../utils/selector'

import "./style.css"
import Can from '../../Components/Can'
import { Task } from '../../Redux/features/task/taskSlice'
import TaskView from './task'


const Index = () => {
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(selectUser)
  const { tasks } = useAppSelector(selectTask)
  const [edit, setEdit] = useState(false)
  const [openTask, setOpenTask] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState("");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "",
    dateDue: '',
  })
  // const taskList = userInfo?.role === "Tutor" ? dispatch(getMyTasksAssignee()) : dispatch(getMyTasks())
  // useEffect(() => {
  //   dispatch(taskList)
  // }, [])

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
    // if (counter === undefined || index !== index) counter = 0
    // if (index === undefined || index !== index) index = index
    const ticketView = <TaskView edit={edit} setEdit={setEdit} userRole={userInfo?.role} {...task} />
    const container = document.getElementById("task-container") as HTMLInputElement
    if (counter % 2 === 0) {

      container.innerHTML =
        //  `${ticketView}`
        `
          <div className = 'task-container'>
            <div className='task-view-header'>
              <h2>${task.title}</h2>
                ${userInfo?.role === "Tutor" ? `<button onclick={()=>console.log("test")}> Edit</button > ` : ""}
            </div >
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
              <p>Donné a <span>${task.assignee}</span> le : <span>${task.date}</span> </p>
            </div>
            <div className='task-view-date'>
              <p>Date limite: <span>${task.dateDue}</span> </p>
              <p>Statut: <span>${task.statut}</span> </p>
            </div>
          </div >
          </div > `;
      // counter++
    } else {
      counter++
      return container.innerHTML = ""
    }
    return container
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  }
  const filteredData = tasks.filter((el) => {
    if (inputText === '') {
      return el;
    } else {
      return el.title.toLowerCase().includes(inputText)
    }
  })
  return (
    <>
      <div className='section_task'>
        <div className='task-progress'>
          <h2>tâches en cours</h2>
          <div className='task-progress-container'>
            <div className='task-progress-search'>
              <input type="text" name="searchTask" id="searchTask" onChange={(event) => handleSearch(event)} placeholder="Search task...." />
              <Can I="create" a="Task">
                <div className='task-add' onClick={() => setIsOpen(true)}>
                  <i className='bx bx-plus'></i>
                </div>
              </Can>
            </div>
            <div className='task-list'>
              {filteredData.map((task, index) => (
                <div key={index} className='task' onClick={() => showTicket(index, task)}>
                  {/* <div key={index} className='task' onClick={() => { setOpenTask(!openTask) }}> */}
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
                  {/* {openTask && <TaskView edit={edit} setEdit={setEdit} userRole={userInfo?.role} {...task} />} */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='task-view'>
          {/* view task */}
          <h2>Tâche</h2>
          <div className='task-container' id='task-container'></div>
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
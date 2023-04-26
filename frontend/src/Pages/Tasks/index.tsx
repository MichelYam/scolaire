import React, { useEffect, useState } from 'react'
import { Modal } from '../../Components/Modal'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { createTask, deleteTask, getMyTasks, getMyTasksAssignee } from "../../Redux/features/task/taskAction"
import { selectTask, selectUser } from '../../utils/selector'

import "./style.css"
import Can from '../../Components/Can'
import { Task } from '../../Redux/features/task/taskSlice'
import TaskView from './task'
import moment from 'moment'



const Index = () => {
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(selectUser)
  const { tasks } = useAppSelector(selectTask)
  const [edit, setEdit] = useState(false)
  const [openTask, setOpenTask] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState("");
  const [currentTask, setCurrentTask] = useState<Task>()
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "",
    dateDue: '',
  })
  // const taskList = userInfo?.role === "Tutor" ? dispatch(getMyTasksAssignee()) : dispatch(getMyTasks())
  useEffect(() => {
    dispatch(getMyTasks())
  }, [])

  useEffect(() => {
    if (currentTask) {
      // setMessages(dispatch(getMessages(currentChat?._id)))
      // dispatch(getMessages(currentChat?._id))
    }
  }, [currentTask]);

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
              {!tasks.length && <span>Vous n'avez pas de devoir pour l'instant</span>}
              {filteredData.map((task, index) => (
                // <div key={index} className='task' onClick={() => showTicket(index, task)}>
                <div key={index} className='task' onClick={() => setCurrentTask(task)}>
                  <div className='task-description'>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <span>{`par ${task.createdBy} `}</span>
                  </div>
                  <div className='task-date'>
                    <p>{moment(task.dateDue).format('DD/MM/YYYY')}</p>
                    {/* <p>{task.dateDue.replaceAll("-", "/")}</p> */}
                    <span className='task-status'>{task.status}</span>
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
          {currentTask && <>
            <h2>Tâche</h2>
            <TaskView edit={edit} setEdit={setEdit} userRole={userInfo?.role} {...currentTask} />
          </>
          }
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
            <input type="date" id='dateDue' onChange={handleChangeValue} placeholder="dd-mm-yyyy" />
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
          <button className='button-task' type='submit'>Créer</button>
        </form>
      </Modal>
    </>
  )
}

export default Index
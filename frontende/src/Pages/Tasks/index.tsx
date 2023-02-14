import React, { useEffect, useState } from 'react'
import { Modal } from '../../Components/Modal'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { createTask, deleteTask, getMyTasks } from "../../Redux/features/task/taskAction"
import { selectTask } from '../../utils/selector'
import "./style.css"
import Can from '../../Components/Can'

const Index = () => {
  const dispatch = useAppDispatch()
  const { tasks } = useAppSelector(selectTask)

  const [isOpen, setIsOpen] = useState(false)
  const [myTasks, setMyTasks] = useState(false)
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

  return (
    <>
      <Can I="create" a="Task">
        <div className='task-add' onClick={() => setIsOpen(true)}>
          <i className='bx bx-plus'></i>
        </div>
      </Can>
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
      <div className='task-list'>
        {tasks.map((task, index) => (
          <div key={index} className='task'>
            <div className='task-description'>
              <p>{task.title}</p>
              <span>{`par ${task.createdBy}`}</span>
            </div>
            <div className='task-date'>
              <p>{task.dateDue}</p>
              <span className='task-status'>{task.status}</span>
            </div>
            <button onClick={() => deleteTaskByID(task._id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Index
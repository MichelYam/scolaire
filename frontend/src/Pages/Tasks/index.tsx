import React, { useEffect, useState } from 'react'
import { Modal } from '../../Components/Modal'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { createTask, deleteTask, getMyTasks, getMyTasksAssignee } from "../../Redux/features/task/taskAction"
import { selectTask, selectUser } from '../../utils/selector'

import Can from '../../Components/Can'
import { Task } from '../../Redux/features/task/taskSlice'
import TaskView from './task'
import moment from 'moment'
import "./style.css"
import TextField from '@mui/material/TextField'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const Index = () => {
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(selectUser)
  const { tasks, error } = useAppSelector(selectTask)
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState("");
  const [currentTask, setCurrentTask] = useState<Task>()
  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignee: "",
    dateDue: '',
  })

  useEffect(() => {
    if (userInfo?.role === "Tutor") {
      dispatch(getMyTasksAssignee())
    } else {
      dispatch(getMyTasks())
    }
  }, [userInfo?.role])

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...taskData,
      [event.target.id]: event.target.value,
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createTask(taskData))
    if (!error) {
      setIsOpen(false)
    } else {
      setEmptyFields(error)
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
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
              {filteredData.map((task, index) => {
                const isSamePerson = task.createdBy === userInfo?.email ? "moi" : task.createdBy
                return <div key={index} className='task' onClick={() => setCurrentTask(task)}>
                  <div className='task-content'>
                    <div className='task-description'>
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                      <span>{`par ${isSamePerson} `}</span>
                    </div>
                    <div className='task-date'>
                      <p className='badge'>{task.dateDue}</p>
                      <span className='task-status'>{task.status}</span>
                    </div>
                  </div>
                  {/* <div className='task-delete'>
                    <Can I="delete" a="Task">
                      <DeleteIcon style={{ color: 'red' }} onClick={() => deleteTaskByID(task._id)} />
                    </Can>
                  </div> */}
                </div>
              })}
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
          <FormControl sx={{ m: 1, with: "100%" }}>
            <TextField id="title" label="Titre *" variant="outlined" onChange={handleChangeValue} error={emptyFields.includes("title") ? true : false} required />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateField']}>
                <DateField
                  id='dateDue'
                  label="date d'échéance"
                  onChange={(e: any) => {
                    setTaskData({
                      ...taskData,
                      dateDue: moment(e?.toString()).format('DD/MM/YYYY')
                    })
                  }}
                  margin="normal"
                  size='small'
                  format="DD/MM/YYYY"
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <TextField id="description" label="Description" variant="outlined" multiline maxRows={4} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setTaskData({
                ...taskData,
                description: e.target.value
              })
            }} />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="assignee">Destinataire</InputLabel>
            <Select
              labelId="assignee"
              id="assignee"
              value={taskData.assignee}
              label="Destinataire"
              error={emptyFields.includes("assignee") ? true : false}
              onChange={(e: SelectChangeEvent) => {
                setTaskData({
                  ...taskData,
                  assignee: e.target.value
                })
              }}
              required
            >
              <MenuItem></MenuItem>
              {userInfo?.friendList.map((friend, index) => {
                const fullName = [friend.firstName, friend.lastName].join(" ")
                return < MenuItem key={index} value={friend.email} >{fullName}</MenuItem>
              })}
            </Select>
          </FormControl>
          <button className='button-task' type='submit'>Créer</button>
        </form>
      </Modal >
    </>
  )
}

export default Index
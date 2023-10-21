import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'
import { deleteTask, updateTask } from "../../../Redux/features/task/taskAction"

import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import moment from 'moment'

import "../style.css"
import { IUser } from '../../../Interfaces';
import Can from '../../../Components/Can';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectUser } from '../../../utils/selector';
interface IProps {
    _id: string
    edit: boolean,
    setEdit: (value: boolean) => void
    userRole?: string
    title: string
    description: string
    assignee: string
    date: string
    dateDue: string
    status: string
    createdBy: IUser
}


const optionsData = [
    {
        label: "en cours",
        value: "en cours"
    },
    {
        label: "terminée",
        value: "terminée"
    }
]
const Index = ({ _id, edit, setEdit, userRole, title, description, assignee, date, dateDue, status, createdBy }: IProps) => {
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector(selectUser)
    const [data, setData] = useState({
        _id: _id,
        title: title,
        description: description,
        dateDue: dateDue,
        status: status
    })
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({
            ...data,
            [event.target.id]: event.target.value,
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("data", data)
        dispatch(updateTask(data))
        setEdit(false)
    }

    const stringAvatar = (name: string) => {
        return {
            // sx: {
            //     bgcolor: stringToColor(name),
            // },
            children: `${name.split(' ')[0][0].toLocaleUpperCase()}`,
        };
    }

    const deleteTaskByID = (_id: string) => {
        dispatch(deleteTask({ _id }))
    }

    return (
        <>
            {
                edit ?
                    <form onSubmit={handleSubmit}>
                        <div className='task-container'>
                            <div className='task-view-header'>
                                <h2>{title}</h2>
                                <button className='edit' onClick={() => setEdit(false)}> <CloseIcon /></button >
                            </div >
                            <div className='task-view-body'>
                                <div className='task-view-assigne'>
                                    <div className='task-assigned'>
                                        <p>Assigné par :</p>
                                        {/* <Avatar {...stringAvatar(createdBy)} /> */}
                                    </div>
                                    <p>Donné a <span>{assignee}</span> le : <span>{date}</span> </p>
                                </div>
                                <div className='task-view-description'>
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" id="description" value={data.description} onChange={handleChangeValue} />
                                </div >
                                <div className='task-view-date'>
                                    <div>
                                        <label htmlFor="dateDue">Date limite:</label>
                                        <input name='dateDue' type="date" id="dateDue" value={data.dateDue} onChange={handleChangeValue} />
                                    </div>
                                    <div>
                                        <label htmlFor="status">status:</label>
                                        <select name="status" id="status" value={data.status} onChange={handleChangeValue}>
                                            {
                                                optionsData.map((item) => (
                                                    <option key={item.value} value={item.value}>{item.label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div >

                            <div className='group-button'>
                                <Button variant="outlined" onClick={() => setEdit(false)}>
                                    Annuler
                                </Button>
                                <Button variant="contained" color="error" onClick={() => deleteTaskByID(_id)}>
                                    Supprimer
                                </Button>
                                <Button variant="contained" type="submit">
                                    Confirmer
                                </Button>
                            </div>
                        </div >
                    </form>
                    :
                    <div className='task-container'>
                        <div className='task-view-header'>
                            <h2>{title}</h2>
                            <div>
                                {/* {userRole === "Tutor" ? <button className='edit' onClick={() => setEdit(!edit)}><EditIcon /></button > : ""} */}
                                <Can I="update" a="Task">
                                    <EditIcon onClick={() => setEdit(!edit)} />
                                </Can>
                                {/* <div className='task-delete'> */}
                                <Can I="delete" a="Task">
                                    <DeleteIcon style={{ color: 'red' }} onClick={() => deleteTaskByID(_id)} />
                                </Can>
                                {/* </div> */}
                            </div>
                        </div >
                        <div className='task-view-body'>
                            <div className='task-view-assigne'>
                                <div className='task-assigned'>
                                    <p>Assigné par :</p>
                                    {/* <Avatar {...stringAvatar(createdBy)} /> */}
                                    <Avatar src={`../assets/uploads/${userInfo?.avatar}`} sx={{ height: '35px', width: '35px' }} />
                                    <p>{createdBy._id === userInfo?._id ? "moi" : [createdBy.firstName, createdBy.lastName].join(" ")}</p>
                                </div>
                                <p>Donné a <span>{assignee}</span> le : <span>{moment(date).format('DD/MM/YYYY')}</span> </p>
                            </div>
                            <div className='task-view-description'>
                                <p>Description</p>
                                <textarea name="description" id="description" value={description} disabled></textarea>
                            </div >
                            <div className='task-view-date'>
                                <p>Date limite: <span>{moment(dateDue).format('DD/MM/YYYY')}</span> </p>
                                <p>Status: <span>{status}</span> </p>
                            </div>
                        </div >
                    </div >
            }

        </>
    )
}

export default Index
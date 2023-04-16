import React from 'react'
import SelectField from '../../../Components/Form/selectField'
import TextAreaField from '../../../Components/Form/textAreaField'
import { Task } from '../../../Redux/features/task/taskSlice'

interface IProps {
    edit: boolean,
    setEdit: (value: boolean) => void
    userRole?: string
    title: string
    description: string
    assignee: string
    date: string
    dateDue: string
    statut: string
    createdBy: string
}
const optionsData = [
    {
        label: "en cours",
        value: "open"
    },
    {
        label: "terminée",
        value: "done"
    }
]
const index = ({ edit, setEdit, userRole, title, description, assignee, date, dateDue, statut, createdBy }: IProps) => {
    // const dispatch = useAppDispatch()

    const handleChange = () => {

    }

    const updateTask = () => {
        // dispatch(updateTask)
    }
    return (
        <>
            {
                edit ?
                    <div className='task-container'>
                        <div className='task-view-header'>
                            <h2>${title}</h2>
                            <button onClick={() => setEdit(false)}> close</button >
                        </div >
                        <div className='task-view-body'>
                            <div className='task-view-description'>
                                <TextAreaField name='description' label='description' value={description} handleChange={handleChange} />
                            </div >
                            <div className='task-view-assigne'>
                                <div className='task-assigned'>
                                    <p>Assigné par :</p>
                                    <p>${createdBy}</p>
                                </div>
                                <p>Donné a <span>${assignee}</span> le : <span>${date}</span> </p>
                            </div>
                            <div className='task-view-date'>
                                {/* <p>Date limite: <span>${dateDue}</span> </p>
                                <p>Statut: <span>${statut}</span> </p> */}
                                <label htmlFor="dateDue">Date limite:</label>
                                <input name='dateDue' type="date" value={dateDue} onChange={handleChange} />
                                <SelectField Options={optionsData} name="statut" label='statut' value={statut} onChange={handleChange} />
                            </div>
                        </div >
                        <div className='group-button'>
                            <button onClick={() => setEdit(false)}>Annuler</button>
                            <button onClick={updateTask}>Confirmer</button>
                        </div>
                    </div >
                    :
                    <div className='task-container'>
                        <div className='task-view-header'>
                            <h2>${title}</h2>
                            ${userRole === "Tutor" ? <button onClick={() => setEdit(!edit)}> Edit</button > : ""}
                        </div >
                        <div className='task-view-body'>
                            <div className='task-view-description'>
                                <p>Description</p>
                                <p>${description}</p>
                            </div >
                            <div className='task-view-assigne'>
                                <div className='task-assigned'>
                                    <p>Assigné par :</p>
                                    <p>${createdBy}</p>
                                </div>
                                <p>Donné a <span>${assignee}</span> le : <span>${date}</span> </p>
                            </div>
                            <div className='task-view-date'>
                                <p>Date limite: <span>${dateDue}</span> </p>
                                <p>Statut: <span>${statut}</span> </p>
                            </div>
                        </div >
                    </div >
            }

        </>
    )
}

export default index
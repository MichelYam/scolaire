import React from 'react'
import { Link } from 'react-router-dom';
import { ITask } from '../../Interfaces'

import "./style.css";

type columnsProp = {
    label: string,
    value: string
}

interface IProps {
    data: ITask[],
    columns: columnsProp[]
}

const Index = ({ data, columns }: IProps) => {
    return (
        <div className='table'>
            <div className="table-header">
                <div className='table-header-status'>
                    <input type="checkbox" />
                    <Link className="link" to="">Open</Link>
                    <Link className="link" to="">Closed</Link>
                </div>
                <div className='table-header-label'>
                    {columns.map((element, index) => {
                        return <span key={index}>
                            {element.label}
                        </span>
                    })}
                </div>
            </div>
            <div className='issue-list'>
                {data.map((item, index) => {
                    return <div className='issue' key={index}>
                        <label>
                            <input type="checkbox" />
                        </label>
                        <div className='issue-header'>
                            <div className='issue-title'>
                                <Link className='issue-link' to="">{item.title} - {item.description}</Link>
                                <p className='badge'>project-concerné</p>
                            </div>
                            <span>{`opened on ${item.date} by ${item.createdBy}`}</span>
                        </div>
                        <div className='issue-assigned'>
                            {/* <span>Avatar de l'utilisateur designé</span>
                            <span>Avatar de l'utilisateur designé</span>
                            <span>Avatar de l'utilisateur designé</span> */}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Index
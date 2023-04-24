import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectEvent, selectRoom, selectTask, selectUser } from '../../utils/selector';
import { getUserDetails } from '../../Redux/features/user/userAction';

//components

//Style
import '../style.css'
import Calendar from '../../Components/Calendar';

const Index = () => {
    const dispatch = useAppDispatch()
    const { events } = useAppSelector(selectEvent)
    const { tasks } = useAppSelector(selectTask)
    return (
        <>
            <h1>DashBoard Content</h1>
            <div className='events'>
                <div className='calendar'>
                    <Calendar />
                </div>
                <div className='event-list'>

                </div>
            </div>
            <div className='todos'>

            </div>
            <div className='conversation'>

            </div>

        </>
    )

}

export default Index
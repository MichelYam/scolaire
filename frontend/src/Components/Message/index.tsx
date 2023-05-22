import React from 'react'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors';
import { INMessage } from '../../Redux/features/message/messageSlice';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../utils/selector';

interface IProps {
    message: INMessage
    own: boolean
    date: string
}

const Index = ({ message, own, date }: IProps) => {
    const { userInfo } = useAppSelector(selectUser)
    const todayDate = new Date()
    const formatedDate = new Date(date)
    const hours = formatedDate.getHours()
    const minutes = formatedDate.getMinutes()
    return (
        // <li className={own ? "reply" : "sender"}>
        <li>
            {own ? !userInfo?.avatar ?
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{userInfo?.firstName?.charAt(0).toUpperCase()}</Avatar>
                :
                <Avatar alt="Remy Sharp" src={`../assets/uploads/${userInfo?.avatar}`} />
                :
                !message.sender.avatar ?
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{message.sender.firstName?.charAt(0).toUpperCase()}</Avatar>
                    :

                    <Avatar alt="Remy Sharp" src={`../assets/uploads/${userInfo?.avatar}`} />
            }
            <div className='message-content'>
                <p>{[hours, minutes].join(":")}</p>
                <p className='message-container'>{message.content}</p>

            </div>
        </li>
    )
}

export default Index


{/* < li className="sender">
        <p> Hey, Are you there? </p>
        <span className="time">10:06 am</span>
    </li>
    <li className="sender">
        <p> Hey, Are you there? </p>
        <span className="time">10:16 am</span>
    </li>
    <li className="repaly">
        <p> Last Minute Festive Packages From Superbreak</p>
        <span className="time">10:20 am</span>
    </li>
    <li className="sender">
        <p> Hey, Are you there? </p>
        <span className="time">10:26 am</span>
    </li>
    <li className="sender">
        <p> Hey, Are you there? </p>
        <span className="time">10:32 am</span>
    </li>
    <li className="repaly">
        <p>Last Minute Festive Packages From Superbreak</p>
        <span className="time">10:35 am</span>
    </li>
    <li>
        <div className="divider">
            <h6>Today</h6>
        </div>
    </li>

    <li className="repaly">
        <p> Last Minute Festive Packages From Superbreak</p>
        <span className="time">10:36 am</span>
    </li>
    <li className="repaly">
        <p>Last Minute Festive Packages From Superbreak</p>
        <span className="time">junt now</span>
    </li> */}
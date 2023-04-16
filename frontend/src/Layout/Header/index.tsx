import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../../Components/DropDown/Index'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { io, Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectUser } from '../../utils/selector';
// import { deleteNotification } from '../../Redux/features/notification/notificationAction';
import { acceptFriendRequest, rejectFriendRequest, getFriendRequest } from '../../Redux/features/user/userAction';
import "./style.css"
import { createRoom } from '../../Redux/features/room/roomAction';
// import { INotification } from '../../Interfaces';

interface IProps {
    firstName?: string,
    sidebarOnClose: () => void
    // acces: string,
}

type INotification = string[]

const Index = ({ firstName, sidebarOnClose }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdown, setDropdown] = useState(null);
    const socket = useRef<Socket>();
    const { notifications } = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

    useEffect(() => {
        socket.current?.on("getNotification", (data) => {
            // setNotifications((prev) => [...prev, data]);
        });
    }, [socket]);

    useEffect(() => {
        dispatch(getFriendRequest())
    }, [])

    const handleAcceptFriendRequest = (notification: any) => {
        console.log(notification.sender._id)
        dispatch(acceptFriendRequest(notification.sender._id))
        // dispatch(createRoom(notification.sender._id))
        console.log(notifications)
    }

    const displayNotification = (notification: any, index: number) => {
        // if (type === "requestFriend") {
        return (
            <div key={index} className='dropdown-item notify-item'>
                <span>{notification.sender.firstName} vous as envoyé une demande d'ami</span>
                <button onClick={() => handleAcceptFriendRequest(notification)}><i className='bx bx-check'></i></button>
                <button onClick={() => { dispatch(rejectFriendRequest(notification._id)) }}><i className='bx bx-x' ></i></button>
            </div>
        )
        // } else {
        // return (
        //     <span onClick={() => setNotification(notification.filter((n) => n !== notification))} className="notification">{`${senderName} vous a envoyé un message`}</span>
        // );
        // }
    };

    return (
        <div className='menu-top'>
            <div className="home-content">
                <i className='bx bx-menu' onClick={sidebarOnClose} />
                <span className="text">Drop Down Sidebar</span>
            </div>

            <ul className='topmenu'>
                {/* <DropDown dropdown={dropdown} id='2' handleDropdown={() => handleDropdown} /> */}
                {/* {/* <li className='topmenu-item'>
                    <div className='nav-link'>
                        <i className="far fa-envelope-open">
                        </i>
                    </div>
                </li> */}
                <li className='topmenu-item' onClick={() => setIsOpen(!isOpen)}>
                    <div className='nav-link notifications'>
                        <i className="far fa-bell"></i>
                        {
                            notifications.length > 0 &&
                            <div className="counter">{notifications.length}</div>
                        }
                    </div>
                    <div className={`dropdown-menu dropdown-content ${isOpen ? "show" : ""}`}>
                        {/* <div className="dropdown-item notify-item"> */}
                        {!notifications.length && <span>Vous n'avez pas de notification pour l'instant</span>}
                        {notifications.map((notification, index) => {
                            return displayNotification(notification, index)
                        })}
                        {/* </div> */}
                    </div>
                </li>
                {/* <li className='topmenu-item'>
                    <div className='nav-link'>
                        <i className="far fa-bell">
                        </i>
                    </div>
                </li> */}
                {/* <li className='topmenu-item' onClick={() => setIsOpen(!isOpen)}>
                    <Link className="nav-link" to="#">
                        <span>
                            <span className="account-user-name">{firstName}</span>
                        </span>
                        <div className="account-user-avatar">
                            <img src="./assets/img/avatar.png" alt="" />
                        </div>
                    </Link>
                    <div className={`dropdown-menu dropdown-content ${isOpen ? "show" : ""}`}>
                        <div className=" dropdown-header noti-title">
                            <h6 className="text-overflow">Welcome !</h6>
                        </div>
                        <Link to="#" className="dropdown-item notify-item">
                            <i className="fas fa-user fa-sm"></i>
                            <span>My Account</span>
                        </Link>
                        <Link to="#" className="dropdown-item notify-item">
                            <i className="fas fa-ruler-horizontal fa-sm"></i>
                            <span>Settings</span>
                        </Link>
                        <Link to="#" className="dropdown-item notify-item">
                            <i className="fas fa-ruler-horizontal fa-sm"></i>
                            <span>Support</span>
                        </Link>
                        <Link to="#" className="dropdown-item notify-item">
                            <i className="fas fa-ruler-horizontal fa-sm"></i>
                            <span>Lock Screen</span>
                        </Link>
                        <Link to="#" className="dropdown-item notify-item">
                            <i className="fas fa-sign-out-alt fa-sm"></i>
                            <span>Logout</span>
                        </Link>
                    </div>
                </li>  */}
            </ul>
        </div>
    )
}

export default Index
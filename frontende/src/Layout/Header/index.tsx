import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import DropDownMenu from '../DropDown/Index'

import "./style.css"

interface IProps {
    firstName?: string,
    sidebarOnClose: () => void
    // acces: string,
}
const Index = ({ firstName, sidebarOnClose }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='menu-top'>
            <div className="home-content">
                <i className='bx bx-menu' onClick={sidebarOnClose} />
                <span className="text">Drop Down Sidebar</span>
            </div>

            <ul className='topmenu'>
                <li className='topmenu-item'>
                    <div className='nav-link'>
                        <i className="far fa-envelope-open">
                        </i>
                    </div>
                </li>
                <li className='topmenu-item'>
                    <div className='nav-link'>
                        <i className="far fa-bell">
                        </i>
                    </div>
                </li>
                <li className='topmenu-item' onClick={() => setIsOpen(!isOpen)}>
                    <Link className="nav-link" to="#">
                        <div className="account-user-avatar">
                            <img src="./assets/img/avatar.png" alt="" />
                        </div>
                        <span>
                            <span className="account-user-name">{firstName}</span>
                            {/* <span className="account-position">Employee</span> */}
                        </span>
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
                </li>
            </ul>
        </div>
    )
}

export default Index
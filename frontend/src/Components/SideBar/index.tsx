import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../Redux/store';
import { RouteType } from '../../routes/config';
import { selectUser } from '../../utils/selector';
import Can from '../Can';
import './style.css'

// import logo from "../../../public/assets/img/logo.png"

interface IProps {
    logout: () => void
    sidebarOpen: boolean
    appRoutes: RouteType[]
}


const Index = ({ logout, sidebarOpen, appRoutes }: IProps) => {
    const { userInfo } = useAppSelector(selectUser)
    let location = useLocation(); //get object that represents the current url
    const { pathname } = location;
    const splitLocation = pathname.split('/');
    return (
        <div className={`sidebar ${sidebarOpen ? "close" : ""}`}>
            <div className="logo-details">
                <Link to="/dashboard">
                    <img src={`../../../assets/logo/logo.png`} alt="logo du site" />
                    <h1 className="logo_name">Learn@Home</h1>
                </Link>
            </div>
            <ul className="nav-links">
                {appRoutes.map((item, index) => (
                    <li key={index} className={splitLocation[1] === item.state ? 'active' : ''}>
                        < Link to={item.path} >
                            <i className={`bx ${item.sidebarProps?.icon}`} />
                            <span className="link_name">{item.sidebarProps?.displayText}</span>
                        </Link>
                    </li>
                ))
                }
                <Can I="view" a="UserList">
                    <p className='sidebar-title'>Management</p>
                    <li className={splitLocation[1] === "users" ? 'active' : ''}>
                        <Link to="/users">
                            <i className='bx bx-check-shield'></i>
                            <span className="link_name">Users</span>
                        </Link>
                    </li>
                </Can>
                {/* {
                    userInfo?.role === "admin" ? <>
                        <p className='sidebar-title'>Management</p>
                        <li className={splitLocation[1] === "users" ? 'active' : ''}>
                            <Link to="/users">
                                <i className='bx bx-check-shield'></i>
                                <span className="link_name">Users</span>
                            </Link>
                        </li>
                    </> : null
                } */}
                <li>
                    <Link className="profile-details" to="/" onClick={logout}>
                        <div className="name-job">
                            <i className='bx bx-log-out'></i>
                            <span className="link_name">Sign-out</span>
                        </div>
                    </Link>
                </li>
            </ul >
        </div >
    )
}

export default Index
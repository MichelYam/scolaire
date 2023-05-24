import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectUser } from '../../utils/selector';
// import { deleteNotification } from '../../Redux/features/notification/notificationAction';
import { acceptFriendRequest, rejectFriendRequest, getFriendRequest } from '../../Redux/features/user/userAction';
import { createRoom } from '../../Redux/features/room/roomAction';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import { INotification } from '../../Interfaces';
import "./style.css"
import { userInfo } from 'os';

interface IProps {
    sidebarOnClose: () => void
    // acces: string,
    logout: () => void
}

type INotification = string[]

const Index = ({ logout, sidebarOnClose }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdown, setDropdown] = useState(null);
    const socket = useRef<Socket>();
    const { notifications } = useAppSelector(selectUser)
    const dropdownRef = useRef<HTMLLIElement>(null)
    const { userInfo } = useAppSelector(selectUser)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificaitonAnchorEl, setNotificationAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const isNotificationMenuOpen = Boolean(notificaitonAnchorEl);
    const dispatch = useAppDispatch()
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

    // useEffect(() => {
    //     socket.current?.on("getNotification", (data) => {
    //         // setNotifications((prev) => [...prev, data]);
    //     });
    // }, [socket]);

    useEffect(() => {
        dispatch(getFriendRequest())
    }, [])

    const handleAcceptFriendRequest = (notification: any) => {
        dispatch(acceptFriendRequest(notification.sender._id))
        dispatch(createRoom(notification.sender._id))
        window.location.reload();
    }

    const displayNotification = (notification: any, index: number) => {
        // if (notification.type === "message") {
        //     return (
        //         <span onClick={() => setNotification(notification.filter((n) => n !== notification))} className="notification">{`${senderName} vous a envoyé un message`}</span>
        //     );
        // }
        // else {
        return (
            <MenuItem key={index} onClick={handleNotificationClose}>
                <span>{notification.sender?.firstName} vous as envoyé une demande d'ami</span>
                <button onClick={() => handleAcceptFriendRequest(notification)}><i className='bx bx-check'></i></button>
                <button onClick={() => { dispatch(rejectFriendRequest(notification._id)) }}><i className='bx bx-x' ></i></button>
            </MenuItem>
        )
        // }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handleNotificationeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };
    return (
        <div className='menu-top'>
            <div className="home-content">
                <i className='bx bx-menu' onClick={sidebarOnClose} />
                <span className="text">Drop Down Sidebar</span>
            </div>
            <div className='topmenu'>
                <Button
                    id="basic-button"
                    aria-controls={isNotificationMenuOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isNotificationMenuOpen ? 'true' : undefined}
                    onClick={handleNotificationeMenuOpen}
                >
                    <div className='nav-link notifications'>
                        <i className="far fa-bell"></i>
                        {
                            notifications.length > 0 &&
                            <div className="counter">{notifications.length}</div>
                        }
                    </div>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={notificaitonAnchorEl}
                    open={isNotificationMenuOpen}
                    onClose={handleNotificationClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {!notifications.length && <span>Vous n'avez pas de notification pour l'instant</span>}
                    {notifications.map((notification, index) => {
                        return displayNotification(notification, index)
                    })}
                </Menu>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            {
                                userInfo?.avatar === "" ?
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: red[500] }}>{userInfo?.firstName.charAt(0).toUpperCase()}</Avatar> :
                                    <Avatar src={`../assets/uploads/${userInfo?.avatar}`} sx={{ height: '35px', width: '35px' }} />
                            }
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleProfileClose}
                    onClick={handleProfileClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Link to="/profile">
                        <MenuItem onClick={handleProfileClose}>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            Mon profile
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={handleProfileClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Paramètre
                    </MenuItem>
                    <Link to="/" onClick={logout}>
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Link>
                </Menu>
            </div >
        </div >
    )
}

export default Index
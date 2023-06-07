import React, { useRef } from 'react'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors';
import { INMessage } from '../../Redux/features/message/messageSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectUser } from '../../utils/selector';
import { deleteMessage, updateMessage } from '../../Redux/features/message/messageAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import './style.css';
import moment from 'moment';
interface IProps {
    message: INMessage
    own: boolean
    date: string
}

const Index = ({ message, own, date }: IProps) => {
    const { userInfo } = useAppSelector(selectUser)
    const todayDate = new Date()
    const yesterday = new Date(todayDate)
    yesterday.setDate(yesterday.getDate() - 1);
    const formatedDate = new Date(date)
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <li>
            <div className='flex justify-content flex-end'>
                {own ? !userInfo?.avatar ?
                    <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}>{userInfo?.firstName?.charAt(0).toUpperCase()}</Avatar>
                    :
                    <Avatar alt="Remy Sharp" src={`../assets/uploads/${userInfo?.avatar}`} sx={{ mr: 2 }} /> :
                    !message.sender.avatar ?
                        <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}>{message.sender.firstName?.charAt(0).toUpperCase()}</Avatar>
                        :
                        <Avatar alt="Remy Sharp" src={`../assets/uploads/${message.sender.avatar}`} sx={{ mr: 2 }} />
                }
                <div className='message-content'>
                    <div>
                        <p className='msg-author'>{[message.sender.firstName, message.sender.lastName].join(" ")}</p>
                        {todayDate.toDateString() === formatedDate.toDateString() ?
                            <p className='msg-timer'>Aujourd’hui à {moment(date).format("HH:mm")}</p> :
                            yesterday.toDateString() === formatedDate.toDateString() ?
                                <p className='msg-timer'>Hier à {moment(date).format("HH:mm")}</p>
                                : <p className='msg-timer'>{moment(date).format("DD/MM/YYYY HH:mm")}</p>}
                    </div>
                    <p className='message-container'>{message.content}</p>

                </div>
            </div>
            <div className='msg-settings'>
                <Box>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: '22ch',
                            position: "absolute"
                        },
                    }}
                >
                    {own ?
                        <div>
                            <MenuItem key='msg-update' onClick={() => dispatch(updateMessage(message._id))}>
                                Modifier le message
                            </MenuItem>
                            <MenuItem key='msg-delete' onClick={() => dispatch(deleteMessage(message._id))}>
                                Supprimer le message
                            </MenuItem>
                        </div>
                        :
                        <div>
                            <MenuItem key='msg-update'>
                                test
                            </MenuItem>
                        </div>
                    }
                </Menu>
            </div>
        </li >
    )
}

export default Index
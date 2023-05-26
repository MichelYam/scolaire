import React from 'react'
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
        // <li className={own ? "reply" : "sender"}>
        <li>
            <div className='flex justify-content flex-end'>
                {own ? !userInfo?.avatar ?
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{userInfo?.firstName?.charAt(0).toUpperCase()}</Avatar>
                    :
                    <Avatar alt="Remy Sharp" src={`../assets/uploads/${userInfo?.avatar}`} /> :
                    !message.sender.avatar ?
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{message.sender.firstName?.charAt(0).toUpperCase()}</Avatar>
                        :
                        <Avatar alt="Remy Sharp" src={`../assets/uploads/${message.sender.avatar}`} />
                }
                <div className='message-content'>
                    <p>{[hours, minutes].join(":")}</p>
                    <p className='message-container'>{message.content}</p>

                </div>
            </div>
            <div className='msg-settings'>
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
                            // maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    {own &&
                        <div>
                            <MenuItem key='msg-update' onClick={() => dispatch(updateMessage(message._id))}>
                                Modifier le message
                            </MenuItem>
                            <MenuItem key='msg-delete' onClick={() => dispatch(deleteMessage(message._id))}>
                                Supprimer le message
                            </MenuItem>
                        </div>
                    }
                </Menu>
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
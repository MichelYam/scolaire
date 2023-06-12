import React, { RefObject, useEffect, useState } from 'react'
import { IUser } from '../../Interfaces';
import { Room } from '../../Redux/features/room/roomSlice';
import './style.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Socket } from 'socket.io-client';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
interface IProps {
    currentChat?: Room
    currentUser: IUser | null
    conversation: Room
    onlineUsers: any
    onClick: () => void
    socket: RefObject<Socket>

}

const StyledOnlineBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        // color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));
const StyledOfflineBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#CBCBCB',
        color: '#44b700',
        // color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));

const Index = ({ conversation, currentUser, onClick, currentChat, socket }: IProps) => {
    const [isOnline, setIsOnline] = useState(false);
    const [friend, setFriend] = useState<any>();

    useEffect(() => {
        const user = conversation.users.find((m) => (
            m._id !== currentUser?._id
        ));
        setFriend(user)
    }, [conversation]);

    useEffect(() => {
        socket.current?.on("getUsers", users => {
            setIsOnline(users.some((u: any) => u.userId === friend?._id));
        });
    }, [friend?._id]);

    return (
        <div key={currentUser?._id} className={`contact ${currentChat?._id === conversation?._id ? "active" : ""}`} onClick={onClick}>
            {
                !friend?.avatar ?
                    isOnline ?
                        < StyledOnlineBadge

                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                        </StyledOnlineBadge>
                        :
                        < StyledOfflineBadge

                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                        </StyledOfflineBadge>
                    :
                    isOnline ?
                        < StyledOnlineBadge

                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={`../assets/uploads/${friend?.avatar}`} />
                        </StyledOnlineBadge>
                        :
                        <StyledOfflineBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={`../assets/uploads/${friend?.avatar}`} />
                        </StyledOfflineBadge>
            }
            <div className="contact-info">
                <p>{[friend?.firstName, friend?.lastName].join(" ")}</p>
                {/* <span>{conversation.latestMessage?.content}</span> */}
            </div>
        </div >
    )
}

export default Index
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { IUser } from '../../Interfaces';
import { Room } from '../../Redux/features/room/roomSlice';
import './style.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Socket, io } from 'socket.io-client';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../utils/selector';
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

const StyledBadge = styled(Badge)(({ theme }) => ({
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
            console.log(users)
            setIsOnline(users.some((u: any) => u.userId === friend?._id));
        });
        console.log("users", isOnline);
    }, [friend?._id]);

    // console.log("isOnline", isOnline)
    return (
        <div key={currentUser?._id} className={`contact ${currentChat?._id === conversation?._id ? "active" : ""}`} onClick={onClick}>
            {
                !friend?.avatar ?
                    <StyledBadge

                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                        {isOnline && <p>je suis connecté</p>}
                    </StyledBadge>
                    :
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar src={`../assets/uploads/${friend?.avatar}`} />
                        {isOnline && <p>je suis connecté</p>}
                    </StyledBadge>
            }
            <div className="contact-info">
                <p>{[friend?.firstName, friend?.lastName].join(" ")}</p>
                {/* <span>{conversation.latestMessage?.content}</span> */}
            </div>
        </div>
    )
}

export default Index
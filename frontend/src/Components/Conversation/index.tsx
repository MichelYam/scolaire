import React, { useEffect, useState } from 'react'
import { IUser } from '../../Interfaces';
import { Room } from '../../Redux/features/room/roomSlice';
import './style.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

interface IProps {
    currentChat?: Room
    currentUser: IUser | null
    conversation: Room
    onClick: () => void
}

const Index = ({ conversation, currentUser, onClick, currentChat }: IProps) => {
    const user = conversation.users.find((m) => (
        m._id !== currentUser?._id
    ));

    const fullName = [user?.firstName, user?.lastName].join(" ")
    return (
        <div key={currentUser?._id} className={`contact ${currentChat?._id === conversation?._id ? "active" : ""}`} onClick={onClick}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            <div className="contact-info">
                <p>{fullName}</p>
                <span>{conversation.latestMessage?.content}</span>
            </div>
        </div>
    )
}

export default Index
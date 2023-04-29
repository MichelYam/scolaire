import React, { useEffect, useState } from 'react'
import { IUser } from '../../Interfaces';
import { Room } from '../../Redux/features/room/roomSlice';
import './style.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

interface IProps {
    // id: number;
    // firstName: string;
    // lastName: string;
    // lastMessage: string
    currentChat?: any
    currentUser: IUser | null
    conversation: Room
    onClick: () => void
}

// const img = "../../public/assets/img/avatar.png";

const Index = ({ conversation, currentUser, onClick, currentChat }: IProps) => {
    const user = conversation.users.find((m) => (
        m._id !== currentUser?._id
    ));
    const lastMessage = conversation.messages[conversation.messages.length - 1] && "";
    const fullName = [user?.firstName, user?.lastName].join(" ")



    return (
        <div key={currentUser?._id} className={`contact ${currentChat?._id === conversation?._id ? "active" : ""}`} onClick={onClick}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            <div className="contact-info">
                <p>{fullName}</p>
                {/* <span>{lastMessage}</span> */}
                <span>ceci est le dernier message envoyé donc voilà</span>
            </div>
        </div>
    )
}

export default Index
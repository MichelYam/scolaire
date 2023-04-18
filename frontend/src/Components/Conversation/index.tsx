import React, { useEffect, useState } from 'react'
import { IUser } from '../../Interfaces';
import { Room } from '../../Redux/features/room/roomSlice';
import './style.css';

interface IProps {
    // id: number;
    // firstName: string;
    // lastName: string;
    // lastMessage: string
    currentUser: IUser | null
    conversation: Room
    onChange: () => void
}

// const img = "../../public/assets/img/avatar.png";

const Index = ({ conversation, currentUser, onChange }: IProps) => {
    const [isActive, setIsActive] = useState("");
    const user = conversation.users.find((m) => (
        m._id !== currentUser?._id
    ));
    const lastMessage = conversation.messages[conversation.messages.length - 1] && "";
    const handleClick = (id: string) => {
        setIsActive(id)
    }
    return (
        // <div key={user?.id} className={`contact ${isActive === user.id ? "active" : ""}`} onClick={() => handleClick(user.id)}>
        <div key={currentUser?._id} className={`contact ${isActive === user?._id ? "active" : ""}`} onClick={onChange}>
            <div className="contact-img">
                <img src="../assets/img/avatar.png" alt="profile de l'utilisateur" />
            </div>
            <div className="contact-info">
                <p>{user?.firstName} {user?.lastName}</p>
                <span>{lastMessage}</span>
            </div>
        </div>
    )
}

export default Index
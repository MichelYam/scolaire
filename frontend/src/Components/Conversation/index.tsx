import React, { useState } from 'react'
import './style.css';

interface IProps {
    id: number;
    firstName: string;
    lastName: string;
    lastMessage: string
}

// const img = "../../public/assets/img/avatar.png";

const Index = ({ id, firstName, lastName, lastMessage }: IProps) => {
    const [isActive, setIsActive] = useState(0);
    const handleClick = (id: number) => {
        setIsActive(id)
    }
    return (
        <div key={id} className={`contact ${isActive === id ? "active" : ""}`} onClick={() => handleClick(id)}>
            <div className="contact-img">
                <img src="../assets/img/avatar.png" alt="profile de l'utilisateur" />
            </div>
            <div className="contact-info">
                <p>{firstName} {lastName}</p>
                <span>{lastMessage}</span>
            </div>
        </div>
    )
}

export default Index
import React, { useState } from 'react'
import './style.css';

interface IProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    key: number;
}

// const img = "../../public/assets/img/avatar.png";

const Index = (props: IProps) => {
    const [isActive, setIsActive] = useState(0);
    const handleClick = (id: number) => {
        setIsActive(id)
    }
    return (
        <div className={`contact ${isActive === props.id ? "active" : ""}`} onClick={() => handleClick(props.id)}>
            <div className="contact-img">
                <img src="../assets/img/avatar.png" alt="profile de l'utilisateur" />
            </div>
            <div className="contact-info">
                <p>{props.firstName}</p>
                <span>Le dernier message envoyé...</span>
            </div>
        </div>
    )
}

export default Index
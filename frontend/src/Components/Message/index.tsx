import React from 'react'

interface IMessage {
    message: string
    own: boolean
}

const Index = ({ message, own }: IMessage) => {
    return (
        <li className={own ? "repaly" : "sender"}>
            <p>{message}</p>
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
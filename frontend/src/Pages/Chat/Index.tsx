import React, { useEffect } from 'react'
import SideBar from '../../Components/SideBar/index';

import { contactMockData } from '../../data/mockData'
import Contact from '../../Components/Contact/index'
import '../style.css'
import SearchBar from '../../Components/SearchBar';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectRoom, selectUser } from '../../utils/selector';
import { getMyRooms } from '../../Redux/features/room/roomAction';

import "./style.css"

const Index = () => {
    const { userInfo } = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const { rooms } = useAppSelector(selectRoom)
    const lastMessage = rooms?.messages[rooms?.messages?.length - 1]
    // console.log(dispatch(getMyRooms()))
    // const test = dispatch(getMyRooms())
    useEffect(() => {
        dispatch(getMyRooms())
        console.log("rooms", rooms);
    }, [])

    // const otherUser = rooms?.users.filter((user) => user.id !== userInfo?.id)

    return (
        <>
            <h2>Chat</h2>
            <section className='chat'>
                <div className='chat-container'>
                    <div className='contacts'>
                        <h3>Liste des contacts</h3>
                        <SearchBar />
                        <div className='contact-list'>
                            {
                                // rooms.map((contact, index) => {
                                //     return <Contact key={index} firstName={''} lastName={''} lastMessage={''} />
                                // })
                            }
                        </div>
                    </div>
                    <div className='contact-conversation'>
                        <div className='conversation-header'>
                            <div className='conversation-header-contact'>
                                <div className='conversation-header-contact-info'>
                                    <img src="../assets/img/avatar.png" alt="" />
                                    <p>Nom du destinataire</p>
                                </div>
                                <div className='conversation-header-contact-call'>
                                    <i className='bx bx-sm bxs-phone-call'></i>
                                    <i className='bx bx-sm bxs-video' ></i>
                                </div>
                            </div>
                        </div>
                        <div className='conversation-content'>
                            <div className="msg-body">
                                <ul>
                                    <li className="sender">
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
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className='conversation-footer'>
                            <div className='conversation-send'>
                                <div className='conversation-send-container'>
                                    <div className='conversation-add'>
                                        <i className='bx bx-sm bxs-plus-circle'></i>
                                    </div>
                                    <input type="text" name="message" id="message" placeholder='Send a message' />
                                    <div className='conversation-option'>
                                        <i className='bx bx-sm bxs-smile' ></i>
                                        <i className='bx bx-sm bxs-send' ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Index
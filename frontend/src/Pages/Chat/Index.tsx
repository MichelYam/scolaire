import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../../Components/SideBar/index';

import { contactMockData } from '../../data/mockData'
import Conversation from '../../Components/Conversation/index'
import '../style.css'
import SearchBar from '../../Components/SearchBar';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectRoom, selectUser } from '../../utils/selector';
import { getMyRooms } from '../../Redux/features/room/roomAction';

import "./style.css"
import { Modal } from '../../Components/Modal';
import InputField from '../../Components/Form/inputField';
import { io, Socket } from 'socket.io-client';
import { ChangeEvent } from 'preact/compat';
import { getMessages } from '../../Redux/features/message/messageAction';

const Index = () => {
    const { userInfo } = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const { rooms } = useAppSelector(selectRoom)
    const [email, setEmail] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversations, setConversations] = useState([]);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [currentChat, setCurrentChat] = useState(null);
    const [error, setError] = useState("");
    const socket = useRef<Socket>();

    // useEffect(() => {
    //     dispatch(getMyRooms())
    // }, [])

    // useEffect(() => {
    //     socket.current = io("wb://localhost:8900");
    //     socket.current.on("getMessage", (data) => {
    //         setArrivalMessage({
    //             sender: data.senderId,
    //             text: data.text,
    //             createdAt: Date.now(),
    //         });
    //     });
    // }, []);

    // useEffect(() => {
    //     arrivalMessage &&
    //         currentChat?.members.includes(arrivalMessage.sender) &&
    //         setMessages((prev) => [...prev, arrivalMessage]);
    // }, [arrivalMessage, currentChat]);

    // useEffect(() => {
    //     socket.current?.emit("addUser", user._id);
    //     socket.current?.on("getUsers", (users) => {
    //         setOnlineUsers(
    //             user.followings.filter((f) => users.some((u) => u.userId === f))
    //         );
    //     });
    // }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                // const res = await axios.get("/conversations/" + user._id);
                const data = dispatch(getMyRooms())
                setConversations(data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [userInfo?.id]);

    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const messages = dispatch(getMessages(currentChat?._id))
                
                setMessages(messages);
            } catch (err) {
                console.log(err);
            }
        };
        getAllMessages();
    }, [currentChat]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = {
            sender: userInfo?.id,
            text: newMessage,
            // conversationId: currentChat._id,
        }
        const receiverId = currentChat?.users.find(
            (user) => user !== userInfo?.id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }
    return (
        <>
            <h2>Chat</h2>
            <section className='chat'>
                <div className='chat-container'>
                    <div className='contacts'>
                        <div className='contacts-header'>
                            <h3>Liste des contacts</h3>
                            <button>add Friend</button>
                            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                <div className='modal-title'>
                                    <h3>Ajouter une personne</h3>

                                </div>
                                <form action="" onSubmit={submit}>
                                    <InputField name="search" label='Email' type='text' onChange={() => handleChange} />
                                    <button type="submit">Ajouter</button>
                                </form>
                            </Modal>
                        </div>
                        <SearchBar />
                        <div className='contact-list'>
                            {
                                // conversations.map((contact, index) => {
                                //     return <Conversation key={index} firstName={''} lastName={''} lastMessage={''} onChange = {()=>{setCurrentChat(c)}} />
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
                                    <form onSubmit={submit}>
                                        <input type="text" name="message" id="message" placeholder='Send a message'
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.currentTarget.value)} />
                                        <button>Send</button>
                                    </form>
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
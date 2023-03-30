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
import { Room } from '../../Redux/features/room/roomSlice';
import Message from '../../Components/Message';
import { IMessage, INMessage } from '../../Redux/features/message/messageSlice';


const Index = () => {
    const { userInfo } = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const { rooms } = useAppSelector(selectRoom)
    const [email, setEmail] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState<any>([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversations, setConversations] = useState([]);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [currentChat, setCurrentChat] = useState<Room>();
    const [error, setError] = useState("");
    const socket = useRef<Socket>();
    const scrollRef = useRef<null | HTMLDivElement>(null);
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
        dispatch(getMyRooms())
    }, [userInfo?._id]);

    useEffect(() => {
        if (currentChat) {
            dispatch(getMessages(currentChat?._id))
        }
    }, [currentChat]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = {
            sender: userInfo?._id,
            text: newMessage,
            // conversationId: currentChat._id,
        }
        // const receiverId = currentChat.users.find(
        //     (user) => user !== userInfo?.id
        // );

        // socket.current.emit("sendMessage", {
        //     senderId: user._id,
        //     receiverId,
        //     text: newMessage,
        // });

        // try {
        //     const res = await axios.post("/messages", message);
        //     setMessages([...messages, res.data]);
        //     setNewMessage("");
        // } catch (err) {
        //     console.log(err);
        // }
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                                rooms.map((room, index) => {
                                    return <Conversation key={index} conversation={room} currentUser={userInfo} onChange={() => setCurrentChat(room)} />
                                })
                            }
                        </div>
                    </div>
                    {currentChat &&
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
                                        <>
                                            {messages?.map((message: { content: string; sender: string | undefined; }) => (
                                                <div ref={scrollRef}>
                                                    {/* <Message message={message.content} own={message.sender === userInfo?._id} /> */}
                                                    <Message message={message.content} own={message.sender === userInfo?._id} />
                                                </div>
                                            ))}
                                        </>

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
                                            <button type='submit'><i className='bx bx-sm bxs-send' ></i></button>
                                            <i className='bx bx-sm bxs-smile' ></i>
                                            {/* <div className='conversation-option'>
                                            <i className='bx bx-sm bxs-send' ></i>
                                        </div> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Index
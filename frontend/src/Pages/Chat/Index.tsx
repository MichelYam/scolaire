import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../../Components/SideBar/index';

import { contactMockData } from '../../data/mockData'
import Conversation from '../../Components/Conversation/index'
import './style.css'
import SearchBar from '../../Components/SearchBar';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectMessage, selectRoom, selectUser } from '../../utils/selector';
import { createRoom, getMyRooms } from '../../Redux/features/room/roomAction';

import { Modal } from '../../Components/Modal';
import InputField from '../../Components/Form/inputField';
import { io, Socket } from 'socket.io-client';
import { ChangeEvent } from 'preact/compat';
import { createMessage, getMessages } from '../../Redux/features/message/messageAction';
import { Room } from '../../Redux/features/room/roomSlice';
import Message from '../../Components/Message';
import animationData from "./animation.json"
import Lottie from "react-lottie";
type INewMessage = {
    sender: string,
    content: string,
    createdAt: string | Date | number,
}

type IProps = {
    notification: {}[]
    setNotification: ({ }) => void
}

const Index = () => {
    // const Index = ({ notification, setNotification }: IProps) => {
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector(selectUser)
    const { messages } = useAppSelector(selectMessage)
    const { rooms } = useAppSelector(selectRoom)
    const [email, setEmail] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState<INewMessage | null>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [currentChat, setCurrentChat] = useState<Room>();
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const socket = useRef<Socket>();
    const scrollRef = useRef<null | HTMLDivElement>(null);

    // const [notification, setNotification] = useState([]);

    // console.log("test", messages)

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                content: data.content,
                createdAt: Date.now(),
            });
        });
        socket.current.on("typing", () => setIsTyping(true));
        socket.current.on("stop typing", () => setIsTyping(false));
    }, []);

    useEffect(() => {
        if (currentChat) {
            // setMessages(dispatch(getMessages(currentChat?._id)))
            socket.current?.emit("join chat", currentChat._id);
            dispatch(getMessages(currentChat?._id))
        }

    }, [currentChat]);


    // useEffect(() => {
    //     arrivalMessage &&
    //         // @ts-ignore TS2564
    //         currentChat?.users.includes(arrivalMessage.sender) &&
    //         dispatch(getMessages(currentChat?._id))
    //         console.log(arrivalMessage)
    // }, [arrivalMessage, currentChat]);

    // useEffect(() => {
    //     socket.current?.emit("addUser", userInfo?._id);
    //     socket.current?.on("getUsers", (users) => {
    //         setOnlineUsers(
    //             userInfo?.friendsList.filter((f) => users.some((u: { userId: any; }) => u.userId === f))
    //         );
    //     });
    // }, [userInfo]);

    useEffect(() => {
        dispatch(getMyRooms())
    }, [userInfo?._id]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.current?.emit("stop typing", currentChat?._id);
        const message = {
            sender: userInfo?._id,
            content: newMessage,
            roomId: currentChat?._id,
        }
        const receiverId = currentChat?.users.find(
            (user) => user._id !== userInfo?._id
        );

        try {
            dispatch(createMessage(message))
            socket.current?.emit("new message", {
                senderId: userInfo?._id,
                receiverId,
                content: newMessage,
            });
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        socket.current?.on("message recieved", (newMessageRecieved) => {
            console.log(newMessageRecieved)
            // if (!currentChat || currentChat._id !== newMessageRecieved.chat._id) {
            // if (!notification.includes(newMessageRecieved)) {
            //     // setNotification([newMessageRecieved, ...notification]);
            // }
            // } else {
            // setMessages([...messages, newMessageRecieved])
            if (currentChat) {
                // console.log("test")
                dispatch(getMessages(currentChat?._id))

            }
            // }
        });
    });

    useEffect(() => {
        // if (currentChat) {
        //     dispatch(getMessages(currentChat?._id))
        // }
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
        console.log
        if (!typing) {
            setTyping(true);
            socket.current?.emit("typing", currentChat?._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.current?.emit("stop typing", currentChat?._id);
                setTyping(false);
            }
        }, timerLength);
    }

    const addUserChat = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(createRoom(email))
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <>
            <h2>Chat</h2>
            <section className='chat'>
                <div className='chat-container'>
                    <div className='contacts'>
                        <div className='contacts-header'>
                            <h3>Liste des contacts</h3>
                            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                <div className='modal-title'>
                                    <h3>Ajouter une personne</h3>
                                </div>
                                <form action="" onSubmit={addUserChat}>
                                    <InputField name="search" label='Email' type='text' onChange={() => handleTypingChange} />
                                    <button type="submit">Ajouter</button>
                                </form>
                            </Modal>
                        </div>
                        <div className='chat-search'>
                            <SearchBar />
                            <i className='bx bx-plus' onClick={() => setIsOpen(true)}></i>
                        </div>
                        <div className='contact-list'>
                            {
                                rooms.map((room, index) =>
                                    <div key={index}>
                                        <Conversation key={index} conversation={room} currentUser={userInfo} onChange={() => setCurrentChat(room)} />
                                    </div>
                                )
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
                                            {messages?.map((message: { content: string; sender: string; }, index: React.Key | null | undefined) => (
                                                <div key={index} ref={scrollRef}>
                                                    <Message message={message.content} own={message.sender === userInfo?._id} />
                                                </div>
                                            ))}
                                        </>

                                    </ul>
                                </div>
                            </div>
                            {istyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                    />
                                </div>
                            ) : (
                                null
                            )}
                            <div className='conversation-footer'>
                                <div className='conversation-send'>
                                    <div className='conversation-send-container'>
                                        <div className='conversation-add'>
                                            <i className='bx bx-sm bxs-plus-circle'></i>
                                        </div>
                                        <form onSubmit={submit}>
                                            <input type="text" name="message" id="message" placeholder='Send a message'
                                                onChange={handleTypingChange} value={newMessage} />
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
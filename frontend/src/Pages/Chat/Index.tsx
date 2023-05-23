import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../../Components/SideBar/index';

import { contactMockData } from '../../data/mockData'
import Conversation from '../../Components/Conversation/index'
import SearchBar from '../../Components/SearchBar';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectMessage, selectRoom, selectUser } from '../../utils/selector';
import { createRoom, getMyRooms } from '../../Redux/features/room/roomAction';

import { Modal } from '../../Components/Modal';
import InputField from '../../Components/Form/inputField';
import { io, Socket } from 'socket.io-client';
import { createMessage, getMessages } from '../../Redux/features/message/messageAction';
import { sendFriendRequest } from '../../Redux/features/user/userAction';
import { Room } from '../../Redux/features/room/roomSlice';
import Message from '../../Components/Message';
import animationData from "./animation.json"
import Lottie from "react-lottie";
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import '../style.css'
import Button from '@mui/material/Button';
import ChatContainer from '../../Components/Chat/ChatContainer';
import Avatar from '@mui/material/Avatar';

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
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [currentChat, setCurrentChat] = useState<Room>();
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const socket = useRef<Socket | null>(null);
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const { notifications } = useAppSelector(selectUser)
    const [inputText, setInputText] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);

    // const [notification, setNotification] = useState([]);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.emit("setup", userInfo);
        socket.current.on("connected", () => setSocketConnected(true));
        socket.current.on("typing", () => setIsTyping(true));
        socket.current.on("stop typing", () => setIsTyping(false));
    }, []);

    useEffect(() => {
        if (currentChat) {
            socket.current?.emit("join chat", currentChat._id);
            dispatch(getMessages(currentChat?._id))
        }

    }, [currentChat]);

    useEffect(() => {
        socket.current?.emit("addUser", userInfo?._id);
        // socket.current?.on("getUsers", (users) => {
        //     setOnlineUsers(
        //         userInfo?.friendsList.filter((f) => users.some((u: { userId: any; }) => u.userId === f))
        //     );
        // });
    }, [userInfo]);

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
        // console.log(receiverId)
        if (!newMessage) return
        try {
            dispatch(createMessage(message))
            socket.current?.emit("new message", {
                sender: userInfo?._id,
                receiverId,
                content: newMessage,
                room: currentChat,
            });
            setNewMessage("");
            if (currentChat) {
                dispatch(getMessages(currentChat?._id))
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        socket.current?.on("message recieved", (newMessageRecieved) => {
            // console.log(newMessageRecieved)
            if (!currentChat || currentChat._id !== newMessageRecieved.room._id) {
                // if (!notifications.includes(newMessageRecieved)) {
                //     dispatch(createNofif());
                //     // setNotification([newMessageRecieved, ...notification]);
                // }
            } else {
                if (currentChat) {
                    dispatch(getMessages(currentChat?._id))
                }
            }
        });

    });

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
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

    const addUserChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(sendFriendRequest(email))
        setIsOpen(false)

    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value.toLowerCase());
    }
    const userFullname = currentChat?.users.find((m) => (
        m._id !== userInfo?._id
    ));
    const filteredData = rooms.filter((el) => {
        const user = el.users.find((m) => (
            m._id !== userInfo?._id
        ));
        const fullName = [user?.firstName, user?.lastName].join(" ")
        if (inputText === '') {
            return el;
        } else {
            return fullName.toLowerCase().includes(inputText)

        }
    })

    return (
        <>
            <h2>Chat</h2>
            <section className='chat'>
                <div className='chat-container'>
                    <div className='contacts'>
                        <div className='contacts-header'>
                            <h3>Liste des contacts</h3>
                            <AddIcon onClick={() => setIsOpen(true)} />
                            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                <div className='modal-title'>
                                    <h3>Ajouter une personne</h3>
                                </div>
                                <form className='add-friend' action="" onSubmit={addUserChat}>
                                    <div>
                                        <TextField id="search" label="Email" variant="standard" onChange={handleChange} />
                                        <Button type="submit"><SendIcon /></Button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                        <div className='chat-search'>
                            <SearchBar onChange={handleSearch} />
                        </div>
                        <div className='contact-list'>
                            {rooms &&
                                filteredData.map((room, index) =>
                                    <Conversation key={index} currentChat={currentChat} conversation={room} currentUser={userInfo} onClick={() => setCurrentChat(room)} />
                                )
                            }
                        </div>
                    </div>
                    {currentChat &&
                        //  <ChatContainer currentChat={currentChat} socket={socket} socketConnected={socketConnected} isTyping={typing} setIsTyping={setIsTyping} />
                        <div className='contact-conversation'>
                            <div className='conversation-header'>
                                <div className='conversation-header-contact'>
                                    <div className='conversation-header-contact-info'>
                                        <Avatar src={`../assets/uploads/${userFullname?.avatar}`} />
                                        <p>{[userFullname?.firstName, userFullname?.lastName].join(" ")}</p>
                                    </div>
                                    <div className='conversation-header-contact-call'>
                                        <i className='bx bx-sm bxs-phone-call'></i>
                                        <i className='bx bx-sm bxs-video' ></i>
                                        <i className='bx bx-dots-vertical-rounded'></i>
                                    </div>
                                </div>
                            </div>
                            <div className='conversation-content'>
                                <div className="msg-body">
                                    <ul>
                                        {!messages.length && <span>Envoyer lui un message pour commencer la discussion.</span>}
                                        {messages && messages.map((message, index) =>
                                            // console.log(message.timeStamp)
                                            <div key={index} ref={scrollRef}>
                                                <Message message={message} own={message.sender._id === userInfo?._id} date={message.timeStamp} />
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {istyping ? (
                                <div className='message-loading'>
                                    <Lottie
                                        options={defaultOptions}
                                        // height={0}
                                        width={70}
                                        style={{ marginLeft: 0 }}
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

function createNofif(): any {
    throw new Error('Function not implemented.');
}

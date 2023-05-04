import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { selectMessage, selectUser } from '../../utils/selector'
import Lottie from "react-lottie";
import { Socket, io } from 'socket.io-client';
import { Room } from '../../Redux/features/room/roomSlice';
import { createMessage, getMessages } from '../../Redux/features/message/messageAction';
import animationData from "./animation.json"
import Message from '../Message/index';
import { getFriendRequest } from '../../Redux/features/user/userAction';

type IProps = {
    currentChat: Room;
    socket: RefObject<Socket>
    socketConnected: boolean
    isTyping: boolean
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
}
type INewMessage = {
    sender: string,
    content: string,
    createdAt: string | Date | number,
}
const ChatContainer = ({ currentChat, socket, socketConnected, isTyping, setIsTyping }: IProps) => {

    const dispatch = useAppDispatch()
    const [typing, setTyping] = useState(false);
    const { messages } = useAppSelector(selectMessage)
    const { userInfo } = useAppSelector(selectUser)
    const { notifications } = useAppSelector(selectUser)
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState("")
    // const [arrivalMessage, setArrivalMessage] = useState<INewMessage>();

    // const [istyping, setIsTyping] = useState(false);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    // useEffect(() => {
    //     socket.current?.on("getMessage", (data: { senderId: any; content: any; }) => {
    //         setArrivalMessage({
    //             sender: data.senderId,
    //             content: data.content,
    //             createdAt: Date.now(),
    //         });
    //     });
    //     // socket.current?.on("typing", () => setIsTyping(true));
    //     // socket.current?.on("stop typing", () => setIsTyping(false));
    //     console.log("arrivalMessage", arrivalMessage)
    // }, [])

    // useEffect(() => {
    //     typingData && typingData.senderId === userId &&
    //         setIsTyping(typingData.typing)
    // }, [typingData, userId])


    // useEffect(() => {
    //     // @ts-ignore TS2564
    //     arrivalMessage && currentChat?.users.includes(arrivalMessage.sender) &&
    //         // arrivalMessage && arrivalMessage.sender === userInfo?._id &&
    //         dispatch(getMessages(currentChat?._id))
    // }, [arrivalMessage, userInfo?._id]);

    useEffect(() => {
        socket.current?.on("message recieved", (newMessageRecieved) => {
            console.log("newMessageRecieved", newMessageRecieved)
            if (!currentChat || currentChat._id !== newMessageRecieved.room._id) {
                console.log("test 1")
                if (!notifications.includes(newMessageRecieved)) {
                    // dispatch(createAlert());
                    // setNotification([newMessageRecieved, ...notification]);
                    console.log("test 2")

                    dispatch(getFriendRequest())

                }
            } else {
                console.log("test 3")

                dispatch(getMessages(currentChat?._id))
            }
        });
    });

    const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
        if (!socketConnected) return;
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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.current?.emit("stop typing", currentChat?._id);
        const message = {
            sender: userInfo?._id,
            content: newMessage,
            roomId: currentChat?._id,
        }
        const receiver = currentChat?.users.find(
            (user) => user._id !== userInfo?._id
        );
        try {
            setNewMessage("");
            if (!newMessage) return
            dispatch(createMessage(message))
            socket.current?.emit("new message", {
                senderId: userInfo?._id,
                receiverId: receiver?._id,
                content: newMessage,
                room: currentChat,
            });
            dispatch(getMessages(currentChat?._id))
        } catch (err) {
            console.log(err);
        }
    }
    const userFullname = currentChat?.users.find((m) => (
        m._id !== userInfo?._id
    ));

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='contact-conversation'>
            <div className='conversation-header'>
                <div className='conversation-header-contact'>
                    <div className='conversation-header-contact-info'>
                        <img src="../assets/img/avatar.png" alt="" />
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
            {isTyping ? (
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
    )
}

export default ChatContainer
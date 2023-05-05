const io = require("socket.io")(8900, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});
let users = [
    {
        _id: "6410f7ffb5d6f8e8f313adf4",
        socketId: "test",
        firstName: "test",
        lastName: "test",
        profileImageUrl: "",
        email: "test@test.com",
        dateOfBirth: "1888-10-25"
    },
    {
        _id: "6410f94d8e968959be0c292a",
        socketId: "azer",
        firstName: "yanis",
        lastName: "yanis",
        profileImageUrl: "",
        email: "yanis@yanis.com",
        dateOfBirth: "1777-10-25"
    }
];

const addUser = (userId, socketId) => {
    !users.some((user) => user._id === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user._id === userId._id);
};

// io.on("connection", (socket) => {
//     //when connect
//     console.log("a user connected.");

//     //take userId and socketId from user
//     socket.on("addUser", (userId) => {
//         addUser(userId, socket.id);
//         io.emit("getUsers", users);
//     });

//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log("User Joined Room: " + room);
//     });
//     socket.on("sendNotification", ({ senderId, receiverId, type }) => {
//         const receiver = getUser(receiverId);
//         const { firstName } = getUser(senderId);
//         io.to(receiver.socketId).emit("getNotification", {
//             firstName,
//             type,
//         });
//     });
//     socket.on("typing", (room) => socket.in(room).emit("typing"));
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     socket.on("new message", (newMessageRecieved) => {
//         // console.log("message recu")
//         // console.log(newMessageRecieved)
//         // let room = newMessageRecieved.chat;

//         // if (!room.users) return console.log("chat.users not defined");

//         // room.users.forEach((user) => {
//         //     if (user._id == newMessageRecieved.sender._id) return;

//             socket.in(newMessageRecieved.receiverId).emit("message recieved", newMessageRecieved);
//         // });
//     });

//     // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     //     const user = getUser(receiverId);
//     //     io.to(user.socketId).emit("getMessage", {
//     //       senderId,
//     //       text,
//     //     });
//     //   });
//     //when disconnect
//     socket.on("disconnect", () => {
//         console.log("a user disconnected!");
//         removeUser(socket.id);
//         io.emit("getUsers", users);
//     });
// });
io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });
    //take userId and socketId from user
    // socket.on("addUser", (userId) => {
    //     addUser(userId, socket.id);
    //     io.emit("getUsers", users);
    // });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => {
        socket.in(room).emit("typing")
    });
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        let room = newMessageRecieved.room;

        if (!room.users) return console.log("room not defined");

        room.users.forEach((user) => {
            console.log("test:", user)
            if (user._id == newMessageRecieved.senderId) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
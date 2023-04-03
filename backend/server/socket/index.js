const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user._id === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user._id === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, content }) => {
        const user = getUser(receiverId);
        console.log(user)
        io.to(receiverId).emit("getMessage", {
            senderId,
            content,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
